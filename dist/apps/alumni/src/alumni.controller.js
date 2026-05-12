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
exports.AlumniController = void 0;
const common_1 = require("@nestjs/common");
const alumni_service_1 = require("./alumni.service");
const register_alumni_dto_1 = require("./dto/register-alumni.dto");
const request_record_dto_1 = require("./dto/request-record.dto");
const alumni_manifest_1 = require("./alumni.manifest");
let AlumniController = class AlumniController {
    constructor(alumniService) {
        this.alumniService = alumniService;
    }
    health() {
        return {
            status: 'ok',
            service: alumni_manifest_1.AlumniManifest.id,
            version: alumni_manifest_1.AlumniManifest.version,
        };
    }
    async register(dto) {
        return this.alumniService.registerAlumni(dto);
    }
    async getProfile(actor_uuid) {
        return this.alumniService.getAlumniProfile(actor_uuid);
    }
    async requestRecord(dto) {
        return this.alumniService.requestRecord(dto);
    }
    async getRecords(actor_uuid) {
        return this.alumniService.getRecordRequests(actor_uuid);
    }
};
exports.AlumniController = AlumniController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AlumniController.prototype, "health", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_alumni_dto_1.RegisterAlumniDto]),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('profile/:actor_uuid'),
    __param(0, (0, common_1.Param)('actor_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('records/request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_record_dto_1.RequestRecordDto]),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "requestRecord", null);
__decorate([
    (0, common_1.Get)('records/:actor_uuid'),
    __param(0, (0, common_1.Param)('actor_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "getRecords", null);
exports.AlumniController = AlumniController = __decorate([
    (0, common_1.Controller)('v1/alumni'),
    __metadata("design:paramtypes", [alumni_service_1.AlumniService])
], AlumniController);
//# sourceMappingURL=alumni.controller.js.map