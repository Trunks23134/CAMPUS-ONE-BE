import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(userId: string): Promise<{
        applicant: any;
        parent: any;
        academic: any[];
        program: any;
        alumni: any[];
        studentNumber: any;
    }>;
    updateProfile(userId: string, body: any): Promise<any>;
}
