import { EnrollmentService } from './enrollment.service';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    getHistory(studentId: string): Promise<{
        id: any;
        status: any;
        enrolledAt: any;
        subjectCode: any;
        subjectName: any;
        units: any;
        section: any;
        schedule: any;
    }[]>;
    getOfferings(studentId?: string, program?: string, yearLevel?: string): Promise<{
        id: any;
        subject_id: any;
        subjectCode: any;
        subjectTitle: any;
        units: any;
        description: any;
        term: any;
        section: any;
        schedule: any;
        room: any;
        slotsTotal: any;
        slotsTaken: number;
        isFull: boolean;
        hasAssignment: boolean;
    }[]>;
    submit(body: {
        studentId: string;
        classAssignmentIds: string[];
    }): Promise<{
        success: boolean;
        message: string;
        enrollments: {
            id: any;
            enrollment_status: any;
            enrolled_at: any;
            class_assignments: {
                section: any;
                schedule: any;
                room: any;
                subjects: {
                    code: any;
                    name: any;
                    units: any;
                }[];
            }[];
        }[];
        count: number;
    }>;
    getStatus(studentId: string): Promise<{
        isEnrolled: boolean;
        enrollmentCount: number;
        totalUnits: any;
        enrollments: {
            id: any;
            status: any;
            enrolledAt: any;
            classAssignmentId: any;
            subject: {
                code: any;
                name: any;
                units: any;
            };
            section: any;
            schedule: any;
            room: any;
        }[];
    }>;
}
