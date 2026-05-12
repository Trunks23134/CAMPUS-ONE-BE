export declare const AlumniManifest: {
    readonly id: "alumni";
    readonly version: "1.0.0";
    readonly displayName: "Alumni";
    readonly description: "Manage alumni registrations, official document requests, and graduation event tracking.";
    readonly routes: readonly ["/api/v1/alumni", "/api/v1/alumni/records"];
    readonly requiredServices: readonly ["platform", "notifications"];
    readonly dbSchema: "public";
    readonly featureFlags: readonly ["alumni.legacy_registration", "alumni.record_requests", "alumni.kafka_graduation_sync"];
    readonly healthEndpoint: "/api/v1/alumni/health";
    readonly port: string;
};
