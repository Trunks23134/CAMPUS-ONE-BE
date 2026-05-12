import { DocumentType } from '../interfaces/alumni.interface';
export declare class RequestRecordDto {
    actor_uuid: string;
    tenant_id: string;
    document_type: DocumentType;
    notes?: string;
}
