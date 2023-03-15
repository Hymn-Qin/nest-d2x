import { Controller, Get, Logger, Req } from '@nestjs/common';
import { TestService } from './test.service';
import { FastifyRequest } from 'fastify';
import { ApiParam, ApiTags } from '@nestjs/swagger';
// @ApiTags('node')
@Controller()
export class TestController {
    private static readonly TAG = TestController.name;

    constructor(private readonly testService: TestService) { }

    // 通过ApiParam装饰器，来描述接口需要哪些参数
    @ApiParam({ name: 'name', type: String, description: '姓名' })
    @ApiParam({ name: 'gender', type: String, description: '性别' })
    @Get('test')
    getHello(@Req() request: FastifyRequest): string {
        Logger.log(request.cookies, TestController.TAG);
        return this.testService.getHello();
    }
}
