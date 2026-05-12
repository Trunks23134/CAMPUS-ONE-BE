"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_1 = require("../../libs/database/supabase");
let SubjectsService = class SubjectsService {
    async getSubjects() {
        const { data, error } = await supabase_1.supabase
            .from('subjects')
            .select('id, code, name, description, units, semester, school_year, is_active')
            .eq('is_active', true)
            .order('code');
        if (error)
            throw new Error(error.message);
        return (data || []).map((s) => ({
            id: s.id,
            subjectCode: s.code,
            subjectTitle: s.name,
            description: s.description,
            units: s.units,
            semester: s.semester,
            schoolYear: s.school_year,
        }));
    }
    async getUserInfo(userId) {
        const { data: ap } = await supabase_1.supabase
            .from('applicant_profiles')
            .select('first_name, last_name')
            .eq('id', userId)
            .maybeSingle();
        const userName = ap ? `${ap.first_name} ${ap.last_name}` : '';
        return { userName };
    }
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)()
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map