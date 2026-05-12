import { ApplicationService } from './application.service';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    health(): {
        status: string;
        service: string;
    };
    getHello(): string;
    logAdmissionEvent(dto: any): Promise<{
        data: {
            id: string;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    createApplicantProfile(dto: any): Promise<{
        data: {
            id: string;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    submitApplication(applicantId: string): Promise<{
        data: {
            reference_number: string;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    trackApplication(dto: {
        email: string;
        referenceNumber: string;
    }): Promise<{
        data: {
            id: string;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    saveApplicantProfile(dto: any): Promise<{
        data: {
            id: string;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    uploadApplicantDocument(dto: any): Promise<{
        data: any;
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    getApplicantAdmissionResult(applicantId: string): Promise<{
        data: any;
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    saveParentInformation(dto: any): Promise<{
        data: {
            id: string;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    saveAcademicBackground(dto: any): Promise<{
        data: {
            count: number;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    saveAlumniRelatives(dto: any): Promise<{
        data: {
            count: number;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    saveProgramSelection(dto: any): Promise<{
        data: {
            id: string;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    fetchApplicationStatus(email: string, referenceNumber: string): Promise<{
        data: any;
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    validateApplicationAccess(email: string, referenceNumber: string): Promise<{
        valid: boolean;
        applicantId: string;
        error?: string;
    }>;
    fetchAdminApplications(): Promise<{
        data: any[];
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    fetchAdminApplicationDetail(applicationId: string): Promise<{
        data: any;
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    updateAdminApplicationStatus(applicationId: string, dto: {
        status: 'Under Review' | 'Passed' | 'Not Accepted';
        rejectionReason?: string;
    }): Promise<{
        data: {
            success: boolean;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    fetchAdminDashboardStats(): Promise<{
        data: {
            total: number;
            pending: number;
            accepted: number;
            rejected: number;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
    updateAdminProgramSelection(applicationId: string, dto: {
        department: string;
        program: string;
    }): Promise<{
        data: {
            success: boolean;
        };
        error: {
            message: string;
            code?: string;
        } | null;
    }>;
}
