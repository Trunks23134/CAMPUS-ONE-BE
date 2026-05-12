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
var GraduationListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraduationListener = void 0;
const common_1 = require("@nestjs/common");
const alumni_service_1 = require("../alumni.service");
let GraduationListener = GraduationListener_1 = class GraduationListener {
    constructor(alumniService) {
        this.alumniService = alumniService;
        this.logger = new common_1.Logger(GraduationListener_1.name);
    }
    async onModuleInit() {
        var _a;
        try {
            const { Kafka } = await Promise.resolve().then(() => require('kafkajs'));
            const brokers = ((_a = process.env.KAFKA_BROKERS) !== null && _a !== void 0 ? _a : 'localhost:9092').split(',');
            const kafka = new Kafka({
                clientId: 'alumni-service',
                brokers,
            });
            const consumer = kafka.consumer({ groupId: 'alumni-graduation-group' });
            await consumer.connect();
            await consumer.subscribe({
                topic: 'graduation.verified.v1',
                fromBeginning: false,
            });
            await consumer.run({
                eachMessage: async ({ message }) => {
                    var _a, _b, _c, _d, _e;
                    const raw = (_a = message.value) === null || _a === void 0 ? void 0 : _a.toString();
                    if (!raw)
                        return;
                    try {
                        const payload = JSON.parse(raw);
                        this.logger.log(`[Kafka] graduation.verified.v1 received — actor_uuid: ${payload.actor_uuid}`);
                        await this.alumniService.logGraduationEvent({
                            actor_uuid: payload.actor_uuid,
                            tenant_id: payload.tenant_id,
                            full_name: (_b = payload.full_name) !== null && _b !== void 0 ? _b : '',
                            email: (_c = payload.email) !== null && _c !== void 0 ? _c : '',
                            program: (_d = payload.program) !== null && _d !== void 0 ? _d : '',
                            graduation_year: (_e = payload.graduation_year) !== null && _e !== void 0 ? _e : new Date().getFullYear(),
                        });
                    }
                    catch (parseErr) {
                        this.logger.error('[Kafka] Failed to process graduation.verified.v1 message', parseErr);
                    }
                },
            });
            this.logger.log(`[Kafka] GraduationListener connected — brokers: ${brokers.join(', ')}`);
        }
        catch (_b) {
            this.logger.warn('[Kafka] Broker unavailable — GraduationListener disabled. ' +
                'Set KAFKA_BROKERS env var to enable.');
        }
    }
};
exports.GraduationListener = GraduationListener;
exports.GraduationListener = GraduationListener = GraduationListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [alumni_service_1.AlumniService])
], GraduationListener);
//# sourceMappingURL=graduation.listener.js.map