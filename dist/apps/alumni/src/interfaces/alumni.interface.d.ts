export declare enum DocumentType {
    TOR = "TOR",
    DIPLOMA = "DIPLOMA",
    GOOD_MORAL = "GOOD_MORAL",
    CERTIFICATE = "CERTIFICATE"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID"
}
export interface IAlumni {
    log_id: string;
    created_at: Date;
    actor_uuid: string;
    action_type: string;
    status_code: number;
    tenant_id: string;
    full_name: string;
    email: string;
    graduation_year: number;
    program: string;
    academic_unit: string;
    is_legacy_registration: boolean;
    document_url?: string;
    student_id?: string;
    proof_reference?: string;
}
export interface IAlumniProfile {
    id?: string;
    email: string;
    name: string;
    student_number?: string;
    graduation_year?: number;
    program?: string;
    is_active: boolean;
    created_at?: Date;
    last_login?: Date;
}
export interface IAlumniRecordRequest {
    log_id: string;
    created_at: Date;
    actor_uuid: string;
    action_type: string;
    status_code: number;
    tenant_id: string;
    document_type: DocumentType;
    fee_amount: number;
    payment_status: PaymentStatus;
    notes?: string;
}
