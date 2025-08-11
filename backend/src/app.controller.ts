import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructore() {}

  @Get()
  getHello(): string {
    return 'backend is running'
  }
}
