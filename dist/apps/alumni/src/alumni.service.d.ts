import { RegisterAlumniDto } from './dto/register-alumni.dto';
import { RequestRecordDto } from './dto/request-record.dto';
import { IAlumni, IAlumniRecordRequest } from './interfaces/alumni.interface';
export declare class AlumniService {
    private readonly logger;
    registerAlumni(dto: RegisterAlumniDto): Promise<IAlumni>;
    getAlumniProfile(actor_uuid: string): Promise<IAlumni>;
    requestRecord(dto: RequestRecordDto): Promise<IAlumniRecordRequest>;
    getRecordRequests(actor_uuid: string): Promise<IAlumniRecordRequest[]>;
    logGraduationEvent(payload: {
        actor_uuid: string;
        tenant_id: string;
        full_name: string;
        email: string;
        program: string;
        graduation_year: number;
    }): Promise<void>;
}
