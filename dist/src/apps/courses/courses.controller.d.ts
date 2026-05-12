import { CoursesService } from './courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getCourses(userId: string): Promise<{
        courses: {
            offeringId: any;
            subjectCode: any;
            subjectName: any;
            units: any;
            section: any;
            schedule: any;
            room: any;
            instructor: any;
        }[];
        totalUnits: any;
    }>;
}
