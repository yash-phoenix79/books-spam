import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('home')
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'All too well.'})
  getHello(): string {
    this.logger.log(`Hello world`);
    return this.appService.getHello();
  }
}
