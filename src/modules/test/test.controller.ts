import { Controller, Get, Logger, Req } from '@nestjs/common';
import { TestService } from './test.service';
import { FastifyRequest } from 'fastify';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
// @ApiTags('node')
@Controller()
export class TestController {
  private static readonly TAG = TestController.name;

  constructor(
    private readonly testService: TestService,
    private readonly httpService: HttpService,
  ) {}

  // 通过ApiParam装饰器，来描述接口需要哪些参数
  @ApiParam({ name: 'name', type: String, description: '姓名' })
  @ApiParam({ name: 'gender', type: String, description: '性别' })
  @Get('test')
  async getHello(@Req() request: FastifyRequest): Promise<object> {
    Logger.log(request.cookies, TestController.TAG);
    const res = await this.testService.getHello();
    return res.pipe().toPromise();
  }
}
