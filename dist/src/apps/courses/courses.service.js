"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_1 = require("../../libs/database/supabase");
let CoursesService = class CoursesService {
    async getCourses(userId) {
        const { data: enrollments, error } = await supabase_1.supabase
            .from('class_enrollments')
            .select(`id, class_assignments!inner(id, section, schedule, room, subjects!inner(code, name, units))`)
            .eq('student_id', userId)
            .eq('enrollment_status', 'enrolled');
        if (error)
            throw new Error(error.message);
        const courses = (enrollments || []).map((e) => ({
            offeringId: e.class_assignments.id,
            subjectCode: e.class_assignments.subjects.code,
            subjectName: e.class_assignments.subjects.name,
            units: e.class_assignments.subjects.units,
            section: e.class_assignments.section,
            schedule: e.class_assignments.schedule,
            room: e.class_assignments.room,
            instructor: null,
        }));
        const totalUnits = courses.reduce((sum, c) => sum + c.units, 0);
        return { courses, totalUnits };
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)()
], CoursesService);
//# sourceMappingURL=courses.service.js.map