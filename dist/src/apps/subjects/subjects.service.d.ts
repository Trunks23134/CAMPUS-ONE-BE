export declare class SubjectsService {
    getSubjects(): Promise<{
        id: any;
        subjectCode: any;
        subjectTitle: any;
        description: any;
        units: any;
        semester: any;
        schoolYear: any;
    }[]>;
    getUserInfo(userId: string): Promise<{
        userName: string;
    }>;
}
