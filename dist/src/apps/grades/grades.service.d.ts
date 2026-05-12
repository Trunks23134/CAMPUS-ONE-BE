export declare class GradesService {
    getGrades(userId: string): Promise<{
        studentName: string;
        program: any;
        grades: {
            code: any;
            subject: any;
            units: any;
            grade: string;
            remarks: any;
        }[];
        totalUnits: any;
        gwa: string;
    }>;
    getDeficiencies(userId: string): Promise<{
        code: any;
        title: any;
        finalGrade: any;
        remarks: any;
    }[]>;
    getGraduation(userId: string): Promise<{
        studentName: string;
        program: any;
        yearLevel: any;
        grades: {
            code: any;
            title: any;
            units: any;
            finalGrade: any;
            remarks: any;
        }[];
    }>;
}
