"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_1 = require("../../libs/database/supabase");
let GradesService = class GradesService {
    async getGrades(userId) {
        var _a;
        const { data: ap } = await supabase_1.supabase.from('applicant_profiles')
            .select('first_name, last_name, program').eq('id', userId).maybeSingle();
        const studentName = ap ? `${ap.first_name} ${ap.last_name}` : '';
        const program = (_a = ap === null || ap === void 0 ? void 0 : ap.program) !== null && _a !== void 0 ? _a : '';
        const { data: sa } = await supabase_1.supabase.from('student_accounts')
            .select('id').eq('applicant_id', userId).maybeSingle();
        if (!sa)
            return { studentName, program, grades: [], totalUnits: 0, gwa: '0.00' };
        const { data: gradesData } = await supabase_1.supabase.from('grades')
            .select('final_grade, remarks, subjects!inner(code, title, units)').eq('student_id', sa.id);
        const grades = (gradesData || []).map((r) => {
            var _a, _b, _c, _d, _e, _f, _g;
            return ({
                code: (_b = (_a = r.subjects) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : '—', subject: (_d = (_c = r.subjects) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : '—',
                units: (_f = (_e = r.subjects) === null || _e === void 0 ? void 0 : _e.units) !== null && _f !== void 0 ? _f : 0, grade: r.final_grade != null ? String(r.final_grade) : '—',
                remarks: (_g = r.remarks) !== null && _g !== void 0 ? _g : '—',
            });
        });
        const totalUnits = grades.reduce((s, g) => s + g.units, 0);
        const nums = grades.map(g => parseFloat(g.grade)).filter(g => !isNaN(g));
        const gwa = nums.length > 0 ? (nums.reduce((s, g) => s + g, 0) / nums.length).toFixed(2) : '0.00';
        return { studentName, program, grades, totalUnits, gwa };
    }
    async getDeficiencies(userId) {
        const { data: sa } = await supabase_1.supabase.from('student_accounts')
            .select('id').eq('applicant_id', userId).maybeSingle();
        if (!sa)
            return [];
        const { data } = await supabase_1.supabase.from('grades')
            .select('final_grade, remarks, subjects!inner(code, title)')
            .eq('student_id', sa.id).in('remarks', ['Failed', 'Incomplete']);
        return (data || []).map((d) => {
            var _a, _b, _c, _d, _e;
            return ({
                code: (_b = (_a = d.subjects) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : '—', title: (_d = (_c = d.subjects) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : '—',
                finalGrade: (_e = d.final_grade) !== null && _e !== void 0 ? _e : null, remarks: d.remarks,
            });
        });
    }
    async getGraduation(userId) {
        var _a, _b;
        const { data: ap } = await supabase_1.supabase.from('applicant_profiles')
            .select('first_name, last_name, program').eq('id', userId).maybeSingle();
        const studentName = ap ? `${ap.first_name} ${ap.last_name}` : '';
        const program = (_a = ap === null || ap === void 0 ? void 0 : ap.program) !== null && _a !== void 0 ? _a : '';
        const { data: sa } = await supabase_1.supabase.from('student_accounts')
            .select('id, year_level').eq('applicant_id', userId).maybeSingle();
        if (!sa)
            return { studentName, program, yearLevel: null, grades: [] };
        const { data: gradesData } = await supabase_1.supabase.from('grades')
            .select('final_grade, remarks, subjects!inner(code, title, units)')
            .eq('student_id', sa.id).not('final_grade', 'is', null);
        return {
            studentName, program, yearLevel: (_b = sa.year_level) !== null && _b !== void 0 ? _b : null,
            grades: (gradesData || []).map((g) => {
                var _a, _b, _c, _d, _e, _f;
                return ({
                    code: (_b = (_a = g.subjects) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : '—', title: (_d = (_c = g.subjects) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : '—',
                    units: (_f = (_e = g.subjects) === null || _e === void 0 ? void 0 : _e.units) !== null && _f !== void 0 ? _f : 0, finalGrade: g.final_grade, remarks: g.remarks,
                });
            }),
        };
    }
};
exports.GradesService = GradesService;
exports.GradesService = GradesService = __decorate([
    (0, common_1.Injectable)()
], GradesService);
//# sourceMappingURL=grades.service.js.map