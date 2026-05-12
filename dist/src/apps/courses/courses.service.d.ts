export declare class CoursesService {
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
