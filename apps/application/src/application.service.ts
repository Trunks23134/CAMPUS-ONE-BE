import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService {
  getHello(): string {
    return 'Application service is running.';
  }
}
