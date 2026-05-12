import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(userId: string): Promise<{
        name: string;
        enrolledCourses: number;
        enrolledUnits: number;
        cartSubjects: number;
        cartUnits: number;
    }>;
}
