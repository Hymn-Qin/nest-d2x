import { Controller, Get, Logger, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  private static readonly TAG = AppController.name;
  
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Req() request: FastifyRequest): string {
    Logger.log(request.cookies, AppController.TAG);
    return this.appService.getHello();
  }
}
