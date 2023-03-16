import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './modules/test/test.controller';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';
import { logger } from './utils/utils';
import config from '@config/main.config';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(config.database), TestModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private static readonly TAG = AppModule.name;
  constructor(private connection: Connection) {
    Logger.log('', connection.driver.options, AppModule.TAG);
  }
  // configure(consumer) {
  //   consumer.apply(logger).forRoutes(TestController);
  // }
}
