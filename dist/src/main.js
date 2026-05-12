"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
    await app.listen(port);
    console.log(`Campus Portal Backend running on http://localhost:${port}`);
    console.log(`Health: http://localhost:${port}/api/health`);
}
bootstrap();
//# sourceMappingURL=main.js.map