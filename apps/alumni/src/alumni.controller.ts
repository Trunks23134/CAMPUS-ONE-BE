import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { RegisterAlumniDto } from './dto/register-alumni.dto';
import { RequestRecordDto } from './dto/request-record.dto';
import { AlumniManifest } from './alumni.manifest';

@Controller('v1/alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  /**
   * GET /api/v1/alumni/health
   * Required by architecture plan §3.1 — all services must expose a healthEndpoint.
   */
  @Get('health')
  health(): { status: string; service: string; version: string } {
    return {
      status: 'ok',
      service: AlumniManifest.id,
      version: AlumniManifest.version,
    };
  }

  /**
   * POST /api/v1/alumni/register
   * Registers an alumnus.
   * - is_legacy_registration = false → standard internal path (student ID lookup)
   * - is_legacy_registration = true → legacy path (proof reference, manual verification)
   *
   * Event fired: alumni.registration.submitted.v1
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterAlumniDto) {
    return this.alumniService.registerAlumni(dto);
  }

  /**
   * GET /api/v1/alumni/profile/:actor_uuid
   * Returns the most recent registration log entry for the given alumnus.
   */
  @Get('profile/:actor_uuid')
  async getProfile(@Param('actor_uuid') actor_uuid: string) {
    return this.alumniService.getAlumniProfile(actor_uuid);
  }

  /**
   * POST /api/v1/alumni/records/request
   * Submits a document request (TOR, Diploma, Good Moral, Certificate).
   * Fee is auto-calculated server-side; payment starts as PENDING.
   *
   * Event fired: alumni.record.requested.v1
   */
  @Post('records/request')
  @HttpCode(HttpStatus.CREATED)
  async requestRecord(@Body() dto: RequestRecordDto) {
    return this.alumniService.requestRecord(dto);
  }

  /**
   * GET /api/v1/alumni/records/:actor_uuid
   * Returns all document requests for an alumnus, ordered newest first.
   */
  @Get('records/:actor_uuid')
  async getRecords(@Param('actor_uuid') actor_uuid: string) {
    return this.alumniService.getRecordRequests(actor_uuid);
  }
}
