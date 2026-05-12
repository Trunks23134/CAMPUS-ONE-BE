"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const supabase_js_1 = require("@supabase/supabase-js");
let ApplicationService = class ApplicationService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY), { auth: { autoRefreshToken: false, persistSession: false } });
    }
    getHello() {
        return 'Application service is running.';
    }
    ensureSupabaseConfig() {
        if (!process.env.SUPABASE_URL || (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_ANON_KEY)) {
            throw new common_1.InternalServerErrorException('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured');
        }
    }
    async logAdmissionEvent(dto) {
        var _a;
        this.ensureSupabaseConfig();
        const { data, error } = await this.supabase
            .from('Admissions_Activity_Logs')
            .insert({
            event_type: dto.event_type,
            applicant_type: dto.applicant_type,
            school_level: dto.school_level,
            metadata: (_a = dto.metadata) !== null && _a !== void 0 ? _a : {},
        })
            .select('id')
            .single();
        if (error)
            return { data: null, error: { message: error.message, code: error.code } };
        return { data: data, error: null };
    }
    async createApplicantProfile(dto) {
        const applicantId = (0, crypto_1.randomUUID)();
        const { error } = await this.supabase.from('applicant_profiles').insert({
            id: applicantId,
            email: dto.email,
            school_level: dto.school_level,
            applicant_type: dto.applicant_type,
            full_name: '',
            first_name: '',
            last_name: '',
            status: 'Under Review',
        });
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: { id: applicantId }, error: null };
    }
    async submitApplication(applicantId) {
        const { data, error } = await this.supabase
            .from('applicant_profiles')
            .update({
            application_submitted_at: new Date().toISOString(),
            status: 'Under Review',
        })
            .eq('id', applicantId)
            .select('reference_number')
            .single();
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: { reference_number: data.reference_number }, error: null };
    }
    async trackApplication(email, referenceNumber) {
        const { data, error } = await this.supabase
            .from('applicant_profiles')
            .select('id')
            .eq('email', email)
            .eq('reference_number', referenceNumber)
            .single();
        if (error)
            return { data: null, error: { message: 'Invalid email or reference number' } };
        return { data: { id: data.id }, error: null };
    }
    async saveApplicantProfile(dto) {
        const fullName = `${dto.first_name} ${dto.last_name}`.trim();
        const { error } = await this.supabase
            .from('applicant_profiles')
            .update({
            first_name: dto.first_name,
            last_name: dto.last_name,
            middle_name: dto.middle_name,
            full_name: fullName,
            birthdate: dto.birthdate,
            mobile_number: dto.mobile_number,
            address: dto.address,
            school_level: dto.school_level,
            applicant_type: dto.applicant_type,
        })
            .eq('id', dto.applicant_id);
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: { id: dto.applicant_id }, error: null };
    }
    async uploadApplicantDocument(dto) {
        const timestamp = Date.now();
        const sanitized = dto.file_name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `${dto.applicant_id}/${timestamp}_${sanitized}`;
        const fileBuffer = Buffer.from(dto.file_base64, 'base64');
        const { error: storageError } = await this.supabase.storage
            .from('applicant-documents')
            .upload(filePath, fileBuffer, { upsert: true, contentType: dto.file_type || 'application/octet-stream' });
        if (storageError)
            return { data: null, error: { message: storageError.message } };
        const { data: urlData } = this.supabase.storage.from('applicant-documents').getPublicUrl(filePath);
        const { data, error: dbError } = await this.supabase
            .from('applicant_documents')
            .insert({
            applicant_id: dto.applicant_id,
            document_name: dto.document_name,
            file_name: dto.file_name,
            file_url: urlData.publicUrl,
            status: 'submitted',
            school_level: dto.school_level,
            applicant_type: dto.applicant_type,
        })
            .select()
            .single();
        if (dbError)
            return { data: null, error: { message: dbError.message } };
        return { data, error: null };
    }
    async getApplicantAdmissionResult(applicantId) {
        const { data, error } = await this.supabase
            .from('admissions_results')
            .select('id, applicant_id, status, noa_url, exam_permit_url, exam_date, exam_time, exam_venue, permit_number, date_issued, applicant_profiles ( full_name, program, school_level, applicant_type )')
            .eq('applicant_id', applicantId)
            .single();
        if (error)
            return { data: null, error: { message: error.message } };
        return { data, error: null };
    }
    async saveParentInformation(payload) {
        const { error } = await this.supabase
            .from('parent_information')
            .upsert(payload, { onConflict: 'applicant_id' });
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: { id: payload.applicant_id }, error: null };
    }
    async saveAcademicBackground(payload) {
        await this.supabase.from('academic_background').delete().eq('applicant_id', payload.applicant_id);
        const records = (payload.entries || []).map((entry) => ({
            applicant_id: payload.applicant_id,
            grade_level: entry.grade_level,
            school_name: entry.school_name,
            completion_year: entry.completion_year,
        }));
        if (records.length === 0)
            return { data: { count: 0 }, error: null };
        const { error } = await this.supabase.from('academic_background').insert(records);
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: { count: records.length }, error: null };
    }
    async saveAlumniRelatives(payload) {
        await this.supabase.from('alumni_relatives').delete().eq('applicant_id', payload.applicant_id);
        const records = (payload.relatives || []).map((relative) => ({
            applicant_id: payload.applicant_id,
            name: relative.name,
            relationship: relative.relationship,
            college: relative.college,
            batch_year: relative.batch_year,
            contact_number: relative.contact_number,
        }));
        if (records.length === 0)
            return { data: { count: 0 }, error: null };
        const { error } = await this.supabase.from('alumni_relatives').insert(records);
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: { count: records.length }, error: null };
    }
    async saveProgramSelection(payload) {
        const { error } = await this.supabase
            .from('program_selections')
            .upsert(payload, { onConflict: 'applicant_id' });
        if (error)
            return { data: null, error: { message: error.message } };
        const programName = payload.college_program || payload.senior_high_track || payload.school_level;
        await this.supabase.from('applicant_profiles').update({ program: programName }).eq('id', payload.applicant_id);
        return { data: { id: payload.applicant_id }, error: null };
    }
    async fetchApplicationStatus(email, referenceNumber) {
        const { data: appData, error: appError } = await this.supabase
            .from('applicant_profiles')
            .select('*')
            .eq('email', email)
            .eq('reference_number', referenceNumber)
            .single();
        if (appError || !appData)
            return { data: null, error: { message: 'Invalid email or reference number' } };
        const { data: docsData } = await this.supabase
            .from('applicant_documents')
            .select('*')
            .eq('applicant_id', appData.id)
            .order('submitted_at', { ascending: false });
        return {
            data: {
                application: appData,
                documents: docsData || [],
                progress: [
                    { step: 1, label: 'Application Submitted', status: 'completed', date: appData.application_submitted_at },
                    {
                        step: 2,
                        label: 'Under Review',
                        status: appData.status === 'Under Review' ? 'current' : 'completed',
                        date: appData.application_submitted_at,
                    },
                    {
                        step: 3,
                        label: 'Verified by Admin',
                        status: appData.status === 'Passed' || appData.status === 'Not Accepted' ? 'completed' : 'pending',
                        date: appData.reviewed_at,
                    },
                    {
                        step: 4,
                        label: 'Decision Released',
                        status: appData.status === 'Passed' || appData.status === 'Not Accepted' ? 'completed' : 'pending',
                        date: appData.reviewed_at,
                    },
                ],
                remarks: appData.rejection_reason,
            },
            error: null,
        };
    }
    async validateApplicationAccess(email, referenceNumber) {
        const { data, error } = await this.supabase
            .from('applicant_profiles')
            .select('id')
            .eq('email', email)
            .eq('reference_number', referenceNumber)
            .single();
        if (error || !data)
            return { valid: false, applicantId: '', error: 'Invalid credentials' };
        return { valid: true, applicantId: data.id };
    }
    async fetchAdminApplications() {
        const { data, error } = await this.supabase
            .from('applicant_profiles')
            .select('*')
            .not('application_submitted_at', 'is', null)
            .order('application_submitted_at', { ascending: false });
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: (data !== null && data !== void 0 ? data : []), error: null };
    }
    async fetchAdminApplicationDetail(applicationId) {
        const { data: profile, error: profileError } = await this.supabase
            .from('applicant_profiles')
            .select('*')
            .eq('id', applicationId)
            .single();
        if (profileError)
            return { data: null, error: { message: profileError.message } };
        const [{ data: parentInfo }, { data: academicBg }, { data: alumni }, { data: documents }, { data: programSelection }] = await Promise.all([
            this.supabase.from('parent_information').select('*').eq('applicant_id', applicationId).single(),
            this.supabase.from('academic_background').select('*').eq('applicant_id', applicationId).order('grade_level', { ascending: true }),
            this.supabase.from('alumni_relatives').select('*').eq('applicant_id', applicationId),
            this.supabase.from('applicant_documents').select('*').eq('applicant_id', applicationId).order('submitted_at', { ascending: false }),
            this.supabase.from('program_selections').select('*').eq('applicant_id', applicationId).single(),
        ]);
        return {
            data: Object.assign(Object.assign({}, profile), { parent_info: parentInfo !== null && parentInfo !== void 0 ? parentInfo : null, academic_background: academicBg !== null && academicBg !== void 0 ? academicBg : [], alumni_relatives: alumni !== null && alumni !== void 0 ? alumni : [], documents: documents !== null && documents !== void 0 ? documents : [], program_selection: programSelection !== null && programSelection !== void 0 ? programSelection : null }),
            error: null,
        };
    }
    async updateAdminApplicationStatus(applicationId, status, rejectionReason) {
        const updateData = {
            status,
            reviewed_at: new Date().toISOString(),
        };
        if (status === 'Passed') {
            const { data: appNumber } = await this.supabase.rpc('generate_applicant_number');
            updateData.applicant_number = appNumber;
        }
        if (status === 'Not Accepted' && rejectionReason) {
            updateData.rejection_reason = rejectionReason;
        }
        const { error } = await this.supabase.from('applicant_profiles').update(updateData).eq('id', applicationId);
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: { success: true }, error: null };
    }
    async fetchAdminDashboardStats() {
        const { data, error } = await this.supabase
            .from('applicant_profiles')
            .select('status')
            .not('application_submitted_at', 'is', null);
        if (error)
            return { data: null, error: { message: error.message } };
        const rows = data !== null && data !== void 0 ? data : [];
        return {
            data: {
                total: rows.length,
                pending: rows.filter((app) => app.status === 'Under Review').length,
                accepted: rows.filter((app) => app.status === 'Passed').length,
                rejected: rows.filter((app) => app.status === 'Not Accepted').length,
            },
            error: null,
        };
    }
    async updateAdminProgramSelection(applicationId, department, program) {
        const { error } = await this.supabase
            .from('program_selections')
            .update({
            college_department: department,
            college_program: program,
        })
            .eq('applicant_id', applicationId);
        if (error)
            return { data: null, error: { message: error.message } };
        return { data: { success: true }, error: null };
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)()
], ApplicationService);
//# sourceMappingURL=application.service.js.map