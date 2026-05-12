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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRecordDto = void 0;
const class_validator_1 = require("class-validator");
const alumni_interface_1 = require("../interfaces/alumni.interface");
class RequestRecordDto {
}
exports.RequestRecordDto = RequestRecordDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RequestRecordDto.prototype, "actor_uuid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestRecordDto.prototype, "tenant_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(alumni_interface_1.DocumentType),
    __metadata("design:type", String)
], RequestRecordDto.prototype, "document_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RequestRecordDto.prototype, "notes", void 0);
//# sourceMappingURL=request-record.dto.js.map