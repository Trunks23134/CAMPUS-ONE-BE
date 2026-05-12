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
exports.GradesController = void 0;
const common_1 = require("@nestjs/common");
const grades_service_1 = require("./grades.service");
let GradesController = class GradesController {
    constructor(gradesService) {
        this.gradesService = gradesService;
    }
    async getGrades(userId) {
        try {
            return await this.gradesService.getGrades(userId);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDeficiencies(userId) {
        try {
            return await this.gradesService.getDeficiencies(userId);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getGraduation(userId) {
        try {
            return await this.gradesService.getGraduation(userId);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.GradesController = GradesController;
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "getGrades", null);
__decorate([
    (0, common_1.Get)(':userId/deficiencies'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "getDeficiencies", null);
__decorate([
    (0, common_1.Get)(':userId/graduation'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "getGraduation", null);
exports.GradesController = GradesController = __decorate([
    (0, common_1.Controller)('grades'),
    __metadata("design:paramtypes", [grades_service_1.GradesService])
], GradesController);
//# sourceMappingURL=grades.controller.js.map