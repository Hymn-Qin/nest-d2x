import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: '用户姓名', required: true })
  @IsString()
  name: string;
}
