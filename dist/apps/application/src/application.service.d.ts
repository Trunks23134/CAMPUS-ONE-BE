type ServiceResponse<T> = {
    data: T | null;
    error: {
        message: string;
        code?: string;
    } | null;
};
export declare class ApplicationService {
    private readonly supabase;
    getHello(): string;
    private ensureSupabaseConfig;
    logAdmissionEvent(dto: any): Promise<ServiceResponse<{
        id: string;
    }>>;
    createApplicantProfile(dto: any): Promise<ServiceResponse<{
        id: string;
    }>>;
    submitApplication(applicantId: string): Promise<ServiceResponse<{
        reference_number: string;
    }>>;
    trackApplication(email: string, referenceNumber: string): Promise<ServiceResponse<{
        id: string;
    }>>;
    saveApplicantProfile(dto: any): Promise<ServiceResponse<{
        id: string;
    }>>;
    uploadApplicantDocument(dto: any): Promise<ServiceResponse<any>>;
    getApplicantAdmissionResult(applicantId: string): Promise<ServiceResponse<any>>;
    saveParentInformation(payload: any): Promise<ServiceResponse<{
        id: string;
    }>>;
    saveAcademicBackground(payload: any): Promise<ServiceResponse<{
        count: number;
    }>>;
    saveAlumniRelatives(payload: any): Promise<ServiceResponse<{
        count: number;
    }>>;
    saveProgramSelection(payload: any): Promise<ServiceResponse<{
        id: string;
    }>>;
    fetchApplicationStatus(email: string, referenceNumber: string): Promise<ServiceResponse<any>>;
    validateApplicationAccess(email: string, referenceNumber: string): Promise<{
        valid: boolean;
        applicantId: string;
        error?: string;
    }>;
    fetchAdminApplications(): Promise<ServiceResponse<any[]>>;
    fetchAdminApplicationDetail(applicationId: string): Promise<ServiceResponse<any>>;
    updateAdminApplicationStatus(applicationId: string, status: 'Under Review' | 'Passed' | 'Not Accepted', rejectionReason?: string): Promise<ServiceResponse<{
        success: boolean;
    }>>;
    fetchAdminDashboardStats(): Promise<ServiceResponse<{
        total: number;
        pending: number;
        accepted: number;
        rejected: number;
    }>>;
    updateAdminProgramSelection(applicationId: string, department: string, program: string): Promise<ServiceResponse<{
        success: boolean;
    }>>;
}
export {};
