export declare class DashboardService {
    getDashboard(userId: string): Promise<{
        name: string;
        enrolledCourses: number;
        enrolledUnits: number;
        cartSubjects: number;
        cartUnits: number;
    }>;
}
