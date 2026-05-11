import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { DocumentType } from '../interfaces/alumni.interface';

export class RequestRecordDto {
  @IsUUID()
  actor_uuid: string;

  @IsString()
  tenant_id: string;

  @IsEnum(DocumentType)
  document_type: DocumentType;

  @IsString()
  @IsOptional()
  notes?: string;
}
