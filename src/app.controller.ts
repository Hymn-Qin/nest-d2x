import { Controller, Get, Logger, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyRequest } from 'fastify';
import { ApiParam, ApiTags } from '@nestjs/swagger';
// @ApiTags('node')
@Controller()
export class AppController {
  private static readonly TAG = AppController.name;

  constructor(private readonly appService: AppService) { }

  // 通过ApiParam装饰器，来描述接口需要哪些参数
  @ApiParam({ name: 'name', type: String, description: '姓名' })
  @ApiParam({ name: 'gender', type: String, description: '性别' })
  @Get('hello')
  getHello(@Req() request: FastifyRequest): string {
    Logger.log(request.cookies, AppController.TAG);
    return this.appService.getHello();
  }
}
