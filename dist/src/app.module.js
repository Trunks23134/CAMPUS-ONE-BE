"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const enrollment_module_1 = require("./apps/enrollment/enrollment.module");
const auth_module_1 = require("./apps/auth/auth.module");
const profile_module_1 = require("./apps/profile/profile.module");
const dashboard_module_1 = require("./apps/dashboard/dashboard.module");
const courses_module_1 = require("./apps/courses/courses.module");
const grades_module_1 = require("./apps/grades/grades.module");
const subjects_module_1 = require("./apps/subjects/subjects.module");
const alumni_module_1 = require("../apps/alumni/src/alumni.module");
const application_module_1 = require("../apps/application/src/application.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            enrollment_module_1.EnrollmentModule,
            auth_module_1.AuthModule,
            profile_module_1.ProfileModule,
            dashboard_module_1.DashboardModule,
            courses_module_1.CoursesModule,
            grades_module_1.GradesModule,
            subjects_module_1.SubjectsModule,
            alumni_module_1.AlumniModule,
            application_module_1.ApplicationModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map