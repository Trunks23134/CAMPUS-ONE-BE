"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AlumniService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlumniService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const supabase_config_1 = require("./config/supabase.config");
const alumni_interface_1 = require("./interfaces/alumni.interface");
const TABLE_ALUMNI_LOGS = 'alumni_reg_activity_logs';
const TABLE_RECORD_REQUESTS = 'alumni_record_requests';
const TABLE_ALUMNI_PROFILES = 'alumni';
const FEE_MAP = {
    [alumni_interface_1.DocumentType.TOR]: 150,
    [alumni_interface_1.DocumentType.DIPLOMA]: 200,
    [alumni_interface_1.DocumentType.GOOD_MORAL]: 100,
    [alumni_interface_1.DocumentType.CERTIFICATE]: 100,
};
let AlumniService = AlumniService_1 = class AlumniService {
    constructor() {
        this.logger = new common_1.Logger(AlumniService_1.name);
    }
    async registerAlumni(dto) {
        var _a, _b;
        const supabase = (0, supabase_config_1.getSupabaseClient)();
        const log_id = (0, crypto_1.randomUUID)();
        const full_name = [dto.first_name, dto.middle_name, dto.last_name]
            .filter(Boolean)
            .join(' ');
        const payload = {
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
            is_legacy_registration: (_a = dto.is_legacy_registration) !== null && _a !== void 0 ? _a : false,
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
            throw new common_1.InternalServerErrorException(error.message);
        }
        this.logger.log(`Alumni registered — log_id: ${log_id}, actor_uuid: ${dto.actor_uuid}`);
        const profilePayload = {
            email: dto.email,
            name: full_name,
            student_number: (_b = dto.student_id) !== null && _b !== void 0 ? _b : undefined,
            graduation_year: dto.graduation_year,
            program: dto.program,
            is_active: true,
        };
        const { error: profileError } = await supabase
            .from(TABLE_ALUMNI_PROFILES)
            .upsert(Object.assign(Object.assign({}, profilePayload), { password_hash: '' }), { onConflict: 'email', ignoreDuplicates: false });
        if (profileError) {
            this.logger.warn(`alumni profile upsert failed (log already written) — ${profileError.message}`);
        }
        return data;
    }
    async getAlumniProfile(actor_uuid) {
        const supabase = (0, supabase_config_1.getSupabaseClient)();
        const { data, error } = await supabase
            .from(TABLE_ALUMNI_LOGS)
            .select('*')
            .eq('actor_uuid', actor_uuid)
            .eq('action_type', 'alumni.registration.submitted.v1')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        if (error || !data) {
            throw new common_1.NotFoundException(`No alumni registration found for actor_uuid: ${actor_uuid}`);
        }
        return data;
    }
    async requestRecord(dto) {
        const supabase = (0, supabase_config_1.getSupabaseClient)();
        const log_id = (0, crypto_1.randomUUID)();
        const payload = {
            log_id,
            created_at: new Date(),
            actor_uuid: dto.actor_uuid,
            action_type: 'alumni.record.requested.v1',
            status_code: 100,
            tenant_id: dto.tenant_id,
            document_type: dto.document_type,
            fee_amount: FEE_MAP[dto.document_type],
            payment_status: alumni_interface_1.PaymentStatus.PENDING,
            notes: dto.notes,
        };
        const { data, error } = await supabase
            .from(TABLE_RECORD_REQUESTS)
            .insert(payload)
            .select()
            .single();
        if (error) {
            this.logger.error('requestRecord failed', error.message);
            throw new common_1.InternalServerErrorException(error.message);
        }
        this.logger.log(`Record requested — doc: ${dto.document_type}, actor_uuid: ${dto.actor_uuid}`);
        return data;
    }
    async getRecordRequests(actor_uuid) {
        const supabase = (0, supabase_config_1.getSupabaseClient)();
        const { data, error } = await supabase
            .from(TABLE_RECORD_REQUESTS)
            .select('*')
            .eq('actor_uuid', actor_uuid)
            .order('created_at', { ascending: false });
        if (error) {
            this.logger.error('getRecordRequests failed', error.message);
            throw new common_1.InternalServerErrorException(error.message);
        }
        return (data !== null && data !== void 0 ? data : []);
    }
    async logGraduationEvent(payload) {
        const supabase = (0, supabase_config_1.getSupabaseClient)();
        const log_id = (0, crypto_1.randomUUID)();
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
            return;
        }
        this.logger.log(`Graduation logged — actor_uuid: ${payload.actor_uuid}`);
        const { error: profileError } = await supabase
            .from(TABLE_ALUMNI_PROFILES)
            .upsert({
            email: payload.email,
            name: payload.full_name,
            graduation_year: payload.graduation_year,
            program: payload.program,
            is_active: true,
            password_hash: '',
        }, { onConflict: 'email', ignoreDuplicates: false });
        if (profileError) {
            this.logger.warn(`graduation profile upsert failed (log already written) — ${profileError.message}`);
        }
    }
};
exports.AlumniService = AlumniService;
exports.AlumniService = AlumniService = AlumniService_1 = __decorate([
    (0, common_1.Injectable)()
], AlumniService);
//# sourceMappingURL=alumni.service.js.map