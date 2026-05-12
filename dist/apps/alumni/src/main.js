"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const alumni_module_1 = require("./alumni.module");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(alumni_module_1.AlumniModule);
    app.enableCors();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const port = (_a = process.env.ALUMNI_PORT) !== null && _a !== void 0 ? _a : 4003;
    await app.listen(port);
    console.log(`Alumni service running on http://localhost:${port}`);
    console.log(`Health: http://localhost:${port}/api/v1/alumni/health`);
}
bootstrap();
//# sourceMappingURL=main.js.map