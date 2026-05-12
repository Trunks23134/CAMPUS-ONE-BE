"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlumniManifest = void 0;
exports.AlumniManifest = {
    id: 'alumni',
    version: '1.0.0',
    displayName: 'Alumni',
    description: 'Manage alumni registrations, official document requests, and graduation event tracking.',
    routes: ['/api/v1/alumni', '/api/v1/alumni/records'],
    requiredServices: ['platform', 'notifications'],
    dbSchema: 'public',
    featureFlags: [
        'alumni.legacy_registration',
        'alumni.record_requests',
        'alumni.kafka_graduation_sync',
    ],
    healthEndpoint: '/api/v1/alumni/health',
    port: (_a = process.env.ALUMNI_PORT) !== null && _a !== void 0 ? _a : '3002',
};
//# sourceMappingURL=alumni.manifest.js.map