"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const supabase_1 = require("../../libs/database/supabase");
let DashboardService = class DashboardService {
    async getDashboard(userId) {
        const { data: ap } = await supabase_1.supabase
            .from('applicant_profiles').select('first_name, last_name').eq('id', userId).maybeSingle();
        const name = ap ? `${ap.first_name} ${ap.last_name}` : '';
        const { data: studentAccount } = await supabase_1.supabase
            .from('student_accounts').select('id, student_number').eq('applicant_id', userId).maybeSingle();
        let enrolledCourses = 0, enrolledUnits = 0;
        if (studentAccount) {
            const { data: enrollments } = await supabase_1.supabase
                .from('class_enrollments')
                .select('class_assignment_id, class_assignments!inner(subject_id, subjects!inner(units))')
                .eq('student_id', studentAccount.id)
                .eq('enrollment_status', 'enrolled');
            if (enrollments === null || enrollments === void 0 ? void 0 : enrollments.length) {
                enrolledCourses = enrollments.length;
                enrolledUnits = enrollments.reduce((sum, e) => { var _a, _b, _c; return sum + ((_c = (_b = (_a = e.class_assignments) === null || _a === void 0 ? void 0 : _a.subjects) === null || _b === void 0 ? void 0 : _b.units) !== null && _c !== void 0 ? _c : 0); }, 0);
            }
        }
        return { name, enrolledCourses, enrolledUnits, cartSubjects: 0, cartUnits: 0 };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)()
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map