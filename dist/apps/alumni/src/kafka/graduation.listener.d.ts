import { OnModuleInit } from '@nestjs/common';
import { AlumniService } from '../alumni.service';
export declare class GraduationListener implements OnModuleInit {
    private readonly alumniService;
    private readonly logger;
    constructor(alumniService: AlumniService);
    onModuleInit(): Promise<void>;
}
