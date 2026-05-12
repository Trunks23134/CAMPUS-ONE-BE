export declare class RegisterAlumniDto {
    actor_uuid: string;
    tenant_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    phone: string;
    academic_unit: string;
    graduation_year: number;
    program: string;
    is_legacy_registration?: boolean;
    student_id?: string;
    proof_reference?: string;
    document_url?: string;
}
