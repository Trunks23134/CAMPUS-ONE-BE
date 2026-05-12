import { AlumniService } from './alumni.service';
import { RegisterAlumniDto } from './dto/register-alumni.dto';
import { RequestRecordDto } from './dto/request-record.dto';
export declare class AlumniController {
    private readonly alumniService;
    constructor(alumniService: AlumniService);
    health(): {
        status: string;
        service: string;
        version: string;
    };
    register(dto: RegisterAlumniDto): Promise<import("./interfaces/alumni.interface").IAlumni>;
    getProfile(actor_uuid: string): Promise<import("./interfaces/alumni.interface").IAlumni>;
    requestRecord(dto: RequestRecordDto): Promise<import("./interfaces/alumni.interface").IAlumniRecordRequest>;
    getRecords(actor_uuid: string): Promise<import("./interfaces/alumni.interface").IAlumniRecordRequest[]>;
}
