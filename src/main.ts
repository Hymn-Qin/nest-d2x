import compress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { config } from 'process';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { MyLogger } from './utils/logger';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  //
  adapter.register(helmet, {
    // contentSecurityPolicy: config.csp, // 在使用fastify-swagger和helmet时有CSP冲突，非生产关闭
  });
  // 压缩请求
  adapter.register(compress);

  // 速率限制器（based on their IP address）：限制访问频率，防刷
  adapter.register(fastifyRateLimit, {
    max: 100,
    timeWindow: 6000,
  });

  //
  // 仅启动了 HTTP 侦听器，该侦听器使应用程序可以侦听入栈的 HTTP 请求。
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    {
      // logger: new MyLogger(),
    },
  );

  // cookie
  app.register(fastifyCookie);

  //添加全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
