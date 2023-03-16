import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FastifyRequest } from 'fastify';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { IResponse } from '@interfaces/response.interface';
import { lastValueFrom } from 'rxjs';
// @ApiTags('node')
@Controller('user')
export class UserController {
  private static readonly TAG = UserController.name;

  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  // 通过ApiParam装饰器，来描述接口需要哪些参数
  @ApiParam({ name: 'name', type: String, description: '姓名' })
  @ApiParam({ name: 'gender', type: String, description: '性别' })
  @Get(':id')
  async getProfile(
    @Req() request: FastifyRequest,
    @Param('id') id: string,
  ): Promise<IResponse<object>> {
    Logger.log(request.cookies, UserController.TAG);
    const data = await this.userService.findById(id);
    const value = await lastValueFrom(data.pipe());
    Logger.log('getProfile: ', '', UserController.TAG);
    if (value) {
      const res: IResponse<object> = {
        status: '0',
        message: 'ok',
        data: value,
      };
      return res;
    } else {
      throw new HttpException('error', HttpStatus.CONFLICT);
    }
  }
}
