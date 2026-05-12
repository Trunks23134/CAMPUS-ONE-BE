"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const supabase_1 = require("../../libs/database/supabase");
let ProfileService = class ProfileService {
    async getProfile(userId) {
        var _a;
        const [apRes, piRes, abRes, psRes, arRes, saRes] = await Promise.all([
            supabase_1.supabase.from('applicant_profiles').select('*').eq('id', userId).maybeSingle(),
            supabase_1.supabase.from('parent_information').select('*').eq('applicant_id', userId).maybeSingle(),
            supabase_1.supabase.from('academic_background').select('*').eq('applicant_id', userId).order('completion_year', { ascending: false }),
            supabase_1.supabase.from('program_selections').select('*').eq('applicant_id', userId).maybeSingle(),
            supabase_1.supabase.from('alumni_relatives').select('*').eq('applicant_id', userId),
            supabase_1.supabase.from('student_accounts').select('student_number').eq('applicant_id', userId).maybeSingle(),
        ]);
        return {
            applicant: apRes.data,
            parent: piRes.data,
            academic: abRes.data || [],
            program: psRes.data,
            alumni: arRes.data || [],
            studentNumber: ((_a = saRes.data) === null || _a === void 0 ? void 0 : _a.student_number) || null,
        };
    }
    async updateProfile(userId, body) {
        const { first_name, last_name, middle_name, mobile_number, address } = body;
        const full_name = `${first_name} ${middle_name} ${last_name}`.replace(/\s+/g, ' ').trim();
        const { data, error } = await supabase_1.supabase
            .from('applicant_profiles')
            .update({ first_name, last_name, middle_name, mobile_number, address, full_name })
            .eq('id', userId).select().single();
        if (error)
            throw new Error(error.message);
        return data;
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)()
], ProfileService);
//# sourceMappingURL=profile.service.js.map