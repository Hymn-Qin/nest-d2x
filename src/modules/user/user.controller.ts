import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FastifyRequest } from 'fastify';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { IResponse } from '@interfaces/response.interface';
import { lastValueFrom } from 'rxjs';
import { UserDto } from './dto/user.dto';
// @ApiTags('node')
@Controller('user')
export class UserController {
  private static readonly TAG = UserController.name;

  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  // 通过ApiParam装饰器，来描述接口需要哪些参数
  @ApiParam({ name: 'id', type: Number, description: '用户id' })
  @Get(':id')
  async getProfile(
    @Req() request: FastifyRequest,
    @Param('id', ParseIntPipe) id: number, // ParseIntPipe 动态转换 参数类型，将 id string转为 int
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

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() userProfile: UserDto) {
    return this.userService.update(id, userProfile);
  }
}
