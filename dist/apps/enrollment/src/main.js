"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const enrollment_module_1 = require("./enrollment.module");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(enrollment_module_1.EnrollmentModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const port = (_a = process.env.ENROLLMENT_PORT) !== null && _a !== void 0 ? _a : 4001;
    await app.listen(port);
    console.log(`Enrollment service running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map