"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const application_service_1 = require("./application.service");
let ApplicationController = class ApplicationController {
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    health() {
        return { status: 'ok', service: 'application' };
    }
    getHello() {
        return this.applicationService.getHello();
    }
    logAdmissionEvent(dto) {
        return this.applicationService.logAdmissionEvent(dto);
    }
    createApplicantProfile(dto) {
        return this.applicationService.createApplicantProfile(dto);
    }
    submitApplication(applicantId) {
        return this.applicationService.submitApplication(applicantId);
    }
    trackApplication(dto) {
        return this.applicationService.trackApplication(dto.email, dto.referenceNumber);
    }
    saveApplicantProfile(dto) {
        return this.applicationService.saveApplicantProfile(dto);
    }
    uploadApplicantDocument(dto) {
        return this.applicationService.uploadApplicantDocument(dto);
    }
    getApplicantAdmissionResult(applicantId) {
        return this.applicationService.getApplicantAdmissionResult(applicantId);
    }
    saveParentInformation(dto) {
        return this.applicationService.saveParentInformation(dto);
    }
    saveAcademicBackground(dto) {
        return this.applicationService.saveAcademicBackground(dto);
    }
    saveAlumniRelatives(dto) {
        return this.applicationService.saveAlumniRelatives(dto);
    }
    saveProgramSelection(dto) {
        return this.applicationService.saveProgramSelection(dto);
    }
    fetchApplicationStatus(email, referenceNumber) {
        return this.applicationService.fetchApplicationStatus(email, referenceNumber);
    }
    validateApplicationAccess(email, referenceNumber) {
        return this.applicationService.validateApplicationAccess(email, referenceNumber);
    }
    fetchAdminApplications() {
        return this.applicationService.fetchAdminApplications();
    }
    fetchAdminApplicationDetail(applicationId) {
        return this.applicationService.fetchAdminApplicationDetail(applicationId);
    }
    updateAdminApplicationStatus(applicationId, dto) {
        return this.applicationService.updateAdminApplicationStatus(applicationId, dto.status, dto.rejectionReason);
    }
    fetchAdminDashboardStats() {
        return this.applicationService.fetchAdminDashboardStats();
    }
    updateAdminProgramSelection(applicationId, dto) {
        return this.applicationService.updateAdminProgramSelection(applicationId, dto.department, dto.program);
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ApplicationController.prototype, "health", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ApplicationController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('log-event'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "logAdmissionEvent", null);
__decorate([
    (0, common_1.Post)('create-profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "createApplicantProfile", null);
__decorate([
    (0, common_1.Post)('submit/:applicantId'),
    __param(0, (0, common_1.Param)('applicantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "submitApplication", null);
__decorate([
    (0, common_1.Post)('track'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "trackApplication", null);
__decorate([
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "saveApplicantProfile", null);
__decorate([
    (0, common_1.Post)('upload-document'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "uploadApplicantDocument", null);
__decorate([
    (0, common_1.Get)('result/:applicantId'),
    __param(0, (0, common_1.Param)('applicantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "getApplicantAdmissionResult", null);
__decorate([
    (0, common_1.Put)('parent-information'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "saveParentInformation", null);
__decorate([
    (0, common_1.Put)('academic-background'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "saveAcademicBackground", null);
__decorate([
    (0, common_1.Put)('alumni-relatives'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "saveAlumniRelatives", null);
__decorate([
    (0, common_1.Put)('program-selection'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "saveProgramSelection", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Query)('referenceNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "fetchApplicationStatus", null);
__decorate([
    (0, common_1.Get)('validate-access'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Query)('referenceNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "validateApplicationAccess", null);
__decorate([
    (0, common_1.Get)('admin/applications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "fetchAdminApplications", null);
__decorate([
    (0, common_1.Get)('admin/applications/:applicationId'),
    __param(0, (0, common_1.Param)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "fetchAdminApplicationDetail", null);
__decorate([
    (0, common_1.Put)('admin/applications/:applicationId/status'),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "updateAdminApplicationStatus", null);
__decorate([
    (0, common_1.Get)('admin/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "fetchAdminDashboardStats", null);
__decorate([
    (0, common_1.Put)('admin/applications/:applicationId/program-selection'),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "updateAdminProgramSelection", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, common_1.Controller)('application'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map