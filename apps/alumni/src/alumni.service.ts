import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { getSupabaseClient } from './config/supabase.config';
import { RegisterAlumniDto } from './dto/register-alumni.dto';
import { RequestRecordDto } from './dto/request-record.dto';
import {
  DocumentType,
  IAlumni,
  IAlumniProfile,
  IAlumniRecordRequest,
  PaymentStatus,
} from './interfaces/alumni.interface';

/** Supabase table names — no FK, no connections to other modules */
const TABLE_ALUMNI_LOGS = 'alumni_reg_activity_logs';
const TABLE_RECORD_REQUESTS = 'alumni_record_requests';
/** Profile table — queried by the frontend; written to AFTER the log */ 
const TABLE_ALUMNI_PROFILES = 'alumni';

/** Fee schedule per document type (in PHP) */
const FEE_MAP: Record<DocumentType, number> = {
  [DocumentType.TOR]: 150,
  [DocumentType.DIPLOMA]: 200,
  [DocumentType.GOOD_MORAL]: 100,
  [DocumentType.CERTIFICATE]: 100,
};

@Injectable()
export class AlumniService {
  private readonly logger = new Logger(AlumniService.name);

  /**
   * POST /alumni/register
   * Handles both paths:
   * - Internal: student ID lookup (is_legacy_registration = false)
   * - Legacy: manual verification (is_legacy_registration = true)
   *
   * Event: alumni.registration.submitted.v1
   * Rule: Writes to log table FIRST. No FK. actor_uuid is plain text.
   */
  async registerAlumni(dto: RegisterAlumniDto): Promise<IAlumni> {
    const supabase = getSupabaseClient();
    const log_id = randomUUID();
    const full_name = [dto.first_name, dto.middle_name, dto.last_name]
      .filter(Boolean)
      .join(' ');

    const payload: IAlumni = {
      log_id,
      created_at: new Date(),
      actor_uuid: dto.actor_uuid,
      action_type: 'alumni.registration.submitted.v1',
      status_code: 100,
      tenant_id: dto.tenant_id,
      full_name,
      email: dto.email,
      graduation_year: dto.graduation_year,
      program: dto.program,
      academic_unit: dto.academic_unit,
      is_legacy_registration: dto.is_legacy_registration ?? false,
      student_id: dto.student_id,
      proof_reference: dto.proof_reference,
      document_url: dto.document_url,
    };

    const { data, error } = await supabase
      .from(TABLE_ALUMNI_LOGS)
      .insert(payload)
      .select()
      .single();

    if (error) {
      this.logger.error('registerAlumni failed', error.message);
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(
      `Alumni registered — log_id: ${log_id}, actor_uuid: ${dto.actor_uuid}`,
    );

    // --- Write profile record AFTER log (log-first rule) ---
    // password_hash is intentionally empty — auth is handled externally.
    // onConflict: 'email' means re-registration is a safe upsert, not a crash.
    const profilePayload: IAlumniProfile = {
      email: dto.email,
      name: full_name,
      student_number: dto.student_id ?? undefined,
      graduation_year: dto.graduation_year,
      program: dto.program,
      is_active: true,
    };

    const { error: profileError } = await supabase
      .from(TABLE_ALUMNI_PROFILES)
      .upsert(
        { ...profilePayload, password_hash: '' },
        { onConflict: 'email', ignoreDuplicates: false },
      );

    if (profileError) {
      // Non-fatal: log entry already committed; warn and continue
      this.logger.warn(
        `alumni profile upsert failed (log already written) — ${profileError.message}`,
      );
    }

    return data as IAlumni;
  }

  /**
   * GET /alumni/profile/:actor_uuid
   * Returns latest registration log for the given alumni.
   * No join, no FK — pure UUID lookup.
   */
  async getAlumniProfile(actor_uuid: string): Promise<IAlumni> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from(TABLE_ALUMNI_LOGS)
      .select('*')
      .eq('actor_uuid', actor_uuid)
      .eq('action_type', 'alumni.registration.submitted.v1')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      throw new NotFoundException(
        `No alumni registration found for actor_uuid: ${actor_uuid}`,
      );
    }

    return data as IAlumni;
  }

  /**
   * POST /alumni/records/request
   * Creates a document request (TOR, Diploma, Good Moral, Certificate).
   * Automatically calculates fee. Payment status starts as PENDING.
   *
   * Event: alumni.record.requested.v1
   */
  async requestRecord(dto: RequestRecordDto): Promise<IAlumniRecordRequest> {
    const supabase = getSupabaseClient();
    const log_id = randomUUID();

    const payload: IAlumniRecordRequest = {
      log_id,
      created_at: new Date(),
      actor_uuid: dto.actor_uuid,
      action_type: 'alumni.record.requested.v1',
      status_code: 100,
      tenant_id: dto.tenant_id,
      document_type: dto.document_type,
      fee_amount: FEE_MAP[dto.document_type],
      payment_status: PaymentStatus.PENDING,
      notes: dto.notes,
    };

    const { data, error } = await supabase
      .from(TABLE_RECORD_REQUESTS)
      .insert(payload)
      .select()
      .single();

    if (error) {
      this.logger.error('requestRecord failed', error.message);
      throw new InternalServerErrorException(error.message);
    }

    this.logger.log(
      `Record requested — doc: ${dto.document_type}, actor_uuid: ${dto.actor_uuid}`,
    );

    return data as IAlumniRecordRequest;
  }

  /**
   * GET /alumni/records/:actor_uuid
   * Returns all document requests for an alumni, newest first.
   */
  async getRecordRequests(actor_uuid: string): Promise<IAlumniRecordRequest[]> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from(TABLE_RECORD_REQUESTS)
      .select('*')
      .eq('actor_uuid', actor_uuid)
      .order('created_at', { ascending: false });

    if (error) {
      this.logger.error('getRecordRequests failed', error.message);
      throw new InternalServerErrorException(error.message);
    }

    return (data ?? []) as IAlumniRecordRequest[];
  }

  /**
   * Called by GraduationListener when a graduation.verified.v1 Kafka event fires.
   * Logs the graduation event to the alumni_reg_activity_logs table.
   * This marks the student as an official alumnus in the log.
   */
  async logGraduationEvent(payload: {
    actor_uuid: string;
    tenant_id: string;
    full_name: string;
    email: string;
    program: string;
    graduation_year: number;
  }): Promise<void> {
    const supabase = getSupabaseClient();
    const log_id = randomUUID();

    const { error } = await supabase.from(TABLE_ALUMNI_LOGS).insert({
      log_id,
      created_at: new Date(),
      actor_uuid: payload.actor_uuid,
      action_type: 'alumni.graduation.verified.v1',
      status_code: 100,
      tenant_id: payload.tenant_id,
      full_name: payload.full_name,
      email: payload.email,
      graduation_year: payload.graduation_year,
      program: payload.program,
      academic_unit: '',
      is_legacy_registration: false,
    });

    if (error) {
      this.logger.error('logGraduationEvent failed', error.message);
      return; // log write failed — do not proceed to profile upsert
    }

    this.logger.log(`Graduation logged — actor_uuid: ${payload.actor_uuid}`);

    // Also upsert the alumni profile so the account is queryable by the frontend
    const { error: profileError } = await supabase
      .from(TABLE_ALUMNI_PROFILES)
      .upsert(
        {
          email: payload.email,
          name: payload.full_name,
          graduation_year: payload.graduation_year,
          program: payload.program,
          is_active: true,
          password_hash: '',
        },
        { onConflict: 'email', ignoreDuplicates: false },
      );

    if (profileError) {
      this.logger.warn(
        `graduation profile upsert failed (log already written) — ${profileError.message}`,
      );
    }
  }
}
