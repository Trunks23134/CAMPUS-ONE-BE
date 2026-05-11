import { Controller, Get } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('health')
  health(): { status: string; service: string } {
    return { status: 'ok', service: 'application' };
  }

  @Get()
  getHello(): string {
    return this.applicationService.getHello();
  }
}
