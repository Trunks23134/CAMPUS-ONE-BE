import { SubjectsService } from './subjects.service';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
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
