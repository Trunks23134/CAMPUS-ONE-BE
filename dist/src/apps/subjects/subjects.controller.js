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
exports.SubjectsController = void 0;
const common_1 = require("@nestjs/common");
const subjects_service_1 = require("./subjects.service");
let SubjectsController = class SubjectsController {
    constructor(subjectsService) {
        this.subjectsService = subjectsService;
    }
    async getSubjects() {
        try {
            return await this.subjectsService.getSubjects();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserInfo(userId) {
        try {
            return await this.subjectsService.getUserInfo(userId);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SubjectsController = SubjectsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "getSubjects", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "getUserInfo", null);
exports.SubjectsController = SubjectsController = __decorate([
    (0, common_1.Controller)('subjects'),
    __metadata("design:paramtypes", [subjects_service_1.SubjectsService])
], SubjectsController);
//# sourceMappingURL=subjects.controller.js.map