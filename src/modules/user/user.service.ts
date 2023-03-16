import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserInfo } from './entities/user.entity';

@Injectable()
export class UserService {
  private static readonly TAG = UserService.name;

  constructor(
    private httpService: HttpService,
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}

  findById(id: number): Observable<object> {
    Logger.log(`findById id: ${id}`, UserService.TAG);

    return from(this.userRepository.findBy({ id: id }));
  }

  async update(id: number, user: UserDto) {
    const data = new UserInfo();
    data.name = user.name;
    if ((await this.userRepository.countBy({ id: id })) == 0) {
      return this.userRepository.save(data);
    }
    return this.userRepository
      .createQueryBuilder()
      .update(data)
      .where('id = :id', { id: id })
      .execute();
  }
}
