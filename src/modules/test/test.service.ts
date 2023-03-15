import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TestService {
  constructor(private httpService: HttpService) {}
  getHello(): Observable<object> {
    return this.httpService.request({
      url: 'http://localhost:3000/api/hello',
      params: {},
      method: 'get',
      data: {},
    });
  }
}
