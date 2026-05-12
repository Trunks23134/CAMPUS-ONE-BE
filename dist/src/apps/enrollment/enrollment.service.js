"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const supabase_1 = require("../../libs/database/supabase");
let EnrollmentService = class EnrollmentService {
    async getHistory(studentId) {
        const { data: sa } = await supabase_1.supabase
            .from('student_accounts').select('id').eq('applicant_id', studentId).maybeSingle();
        if (!sa)
            return [];
        const { data, error } = await supabase_1.supabase
            .from('class_enrollments')
            .select(`id, enrollment_status, enrolled_at,
        class_assignments!inner(section, schedule, subjects!inner(code, name, units))`)
            .eq('student_id', sa.id)
            .order('enrolled_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        return (data || []).map((e) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return ({
                id: e.id, status: e.enrollment_status, enrolledAt: e.enrolled_at,
                subjectCode: (_b = (_a = e.class_assignments) === null || _a === void 0 ? void 0 : _a.subjects) === null || _b === void 0 ? void 0 : _b.code,
                subjectName: (_d = (_c = e.class_assignments) === null || _c === void 0 ? void 0 : _c.subjects) === null || _d === void 0 ? void 0 : _d.name,
                units: (_g = (_f = (_e = e.class_assignments) === null || _e === void 0 ? void 0 : _e.subjects) === null || _f === void 0 ? void 0 : _f.units) !== null && _g !== void 0 ? _g : 0,
                section: (_h = e.class_assignments) === null || _h === void 0 ? void 0 : _h.section,
                schedule: (_j = e.class_assignments) === null || _j === void 0 ? void 0 : _j.schedule,
            });
        });
    }
    async getOfferings(studentId, program, yearLevel) {
        var _a;
        let studentProgram = program;
        let studentYearLevel = yearLevel ? parseInt(yearLevel) : undefined;
        if (studentId && (!program || !yearLevel)) {
            const { data: student } = await supabase_1.supabase
                .from('student_accounts').select('applicant_id').eq('id', studentId).maybeSingle();
            if (student === null || student === void 0 ? void 0 : student.applicant_id) {
                const { data: ps } = await supabase_1.supabase
                    .from('program_selections').select('college_program, school_level')
                    .eq('applicant_id', student.applicant_id).maybeSingle();
                if (ps) {
                    studentProgram = ps.college_program;
                    const levelMap = { Freshman: 1, Sophomore: 2, Junior: 3, Senior: 4 };
                    studentYearLevel = (_a = levelMap[ps.school_level]) !== null && _a !== void 0 ? _a : 1;
                }
            }
        }
        if (!studentProgram || !studentYearLevel)
            return [];
        const { data: curriculum, error } = await supabase_1.supabase
            .from('curriculum')
            .select('id, program, year_level, term, subject_id, subjects!inner(id, code, name, units, description)')
            .eq('program', studentProgram).eq('year_level', studentYearLevel);
        if (error)
            throw new Error(error.message);
        const subjectIds = (curriculum || []).map((cs) => cs.subject_id);
        if (!subjectIds.length)
            return [];
        const { data: assignments } = await supabase_1.supabase
            .from('class_assignments')
            .select('id, subject_id, section, schedule, room, max_students, is_active')
            .in('subject_id', subjectIds).eq('is_active', true);
        const { data: counts } = await supabase_1.supabase
            .from('class_enrollments').select('class_assignment_id').eq('enrollment_status', 'enrolled');
        const countMap = {};
        (counts || []).forEach((ec) => {
            countMap[ec.class_assignment_id] = (countMap[ec.class_assignment_id] || 0) + 1;
        });
        return (curriculum || []).map((cs) => {
            const a = (assignments || []).find((ca) => ca.subject_id === cs.subject_id);
            return {
                id: (a === null || a === void 0 ? void 0 : a.id) || cs.id, subject_id: cs.subject_id,
                subjectCode: cs.subjects.code, subjectTitle: cs.subjects.name,
                units: cs.subjects.units, description: cs.subjects.description, term: cs.term,
                section: (a === null || a === void 0 ? void 0 : a.section) || 'TBA', schedule: (a === null || a === void 0 ? void 0 : a.schedule) || 'TBA', room: (a === null || a === void 0 ? void 0 : a.room) || 'TBA',
                slotsTotal: (a === null || a === void 0 ? void 0 : a.max_students) || 0,
                slotsTaken: a ? (countMap[a.id] || 0) : 0,
                isFull: a ? ((countMap[a.id] || 0) >= a.max_students) : false,
                hasAssignment: !!a,
            };
        });
    }
    async submit(studentId, classAssignmentIds) {
        if (!studentId || !(classAssignmentIds === null || classAssignmentIds === void 0 ? void 0 : classAssignmentIds.length))
            throw new common_1.BadRequestException('Missing required fields: studentId and classAssignmentIds');
        const { data: existing } = await supabase_1.supabase
            .from('class_enrollments').select('class_assignment_id')
            .eq('student_id', studentId).in('class_assignment_id', classAssignmentIds)
            .eq('enrollment_status', 'enrolled');
        if (existing === null || existing === void 0 ? void 0 : existing.length)
            throw new common_1.BadRequestException('Student is already enrolled in one or more of these classes');
        const { data: assignments } = await supabase_1.supabase
            .from('class_assignments').select('id, max_students').in('id', classAssignmentIds);
        const { data: enrollmentCounts } = await supabase_1.supabase
            .from('class_enrollments').select('class_assignment_id')
            .in('class_assignment_id', classAssignmentIds).eq('enrollment_status', 'enrolled');
        const countMap = {};
        (enrollmentCounts || []).forEach((ec) => {
            countMap[ec.class_assignment_id] = (countMap[ec.class_assignment_id] || 0) + 1;
        });
        const fullClasses = (assignments || []).filter((ca) => (countMap[ca.id] || 0) >= ca.max_students);
        if (fullClasses.length)
            throw new common_1.BadRequestException('One or more classes are full');
        const records = classAssignmentIds.map(id => ({
            student_id: studentId, class_assignment_id: id,
            enrollment_status: 'enrolled', enrolled_at: new Date().toISOString(),
        }));
        const { data, error } = await supabase_1.supabase.from('class_enrollments').insert(records)
            .select(`id, enrollment_status, enrolled_at,
        class_assignments!inner(section, schedule, room, subjects!inner(code, name, units))`);
        if (error)
            throw new Error(error.message);
        return { success: true, message: 'Successfully enrolled in classes', enrollments: data, count: (data === null || data === void 0 ? void 0 : data.length) || 0 };
    }
    async getStatus(studentId) {
        const { data: enrollments, error } = await supabase_1.supabase
            .from('class_enrollments')
            .select(`id, enrollment_status, enrolled_at, class_assignment_id,
        class_assignments!inner(subject_id, section, schedule, room, subjects!inner(code, name, units))`)
            .eq('student_id', studentId).eq('enrollment_status', 'enrolled');
        if (error)
            throw new Error(error.message);
        const totalUnits = (enrollments || []).reduce((sum, e) => { var _a, _b; return sum + (((_b = (_a = e.class_assignments) === null || _a === void 0 ? void 0 : _a.subjects) === null || _b === void 0 ? void 0 : _b.units) || 0); }, 0);
        return {
            isEnrolled: !!(enrollments === null || enrollments === void 0 ? void 0 : enrollments.length),
            enrollmentCount: (enrollments === null || enrollments === void 0 ? void 0 : enrollments.length) || 0,
            totalUnits,
            enrollments: (enrollments || []).map((e) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return ({
                    id: e.id, status: e.enrollment_status, enrolledAt: e.enrolled_at,
                    classAssignmentId: e.class_assignment_id,
                    subject: {
                        code: (_b = (_a = e.class_assignments) === null || _a === void 0 ? void 0 : _a.subjects) === null || _b === void 0 ? void 0 : _b.code,
                        name: (_d = (_c = e.class_assignments) === null || _c === void 0 ? void 0 : _c.subjects) === null || _d === void 0 ? void 0 : _d.name,
                        units: (_f = (_e = e.class_assignments) === null || _e === void 0 ? void 0 : _e.subjects) === null || _f === void 0 ? void 0 : _f.units,
                    },
                    section: (_g = e.class_assignments) === null || _g === void 0 ? void 0 : _g.section,
                    schedule: (_h = e.class_assignments) === null || _h === void 0 ? void 0 : _h.schedule,
                    room: (_j = e.class_assignments) === null || _j === void 0 ? void 0 : _j.room,
                });
            }),
        };
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)()
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map