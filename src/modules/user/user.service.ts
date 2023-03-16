import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserInfo } from './entities/user.entity';

@Injectable()
export class UserService {
  private static readonly TAG = UserService.name;

  constructor(
    private httpService: HttpService,
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}

  findById(id: string): Observable<object> {
    Logger.log(`findById id: ${id}`, UserService.TAG);

    return from(this.userRepository.findBy({ id: Number.parseInt(id) }));
  }
}
