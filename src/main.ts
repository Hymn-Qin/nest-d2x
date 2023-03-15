import compress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ValidationPipe } from './pipes/validation.pipe';
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

  // 全局前缀
  app.setGlobalPrefix('/api');

  // class-validator效验
  app.useGlobalPipes(new ValidationPipe());

  //添加全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  const options = new DocumentBuilder()
    .setTitle('珊瑚海Node-BFF服务文档')
    .setDescription('珊瑚海Node-BFF服务文档') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .addTag('node')
    // .setBasePath('http://localhost:5000')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
}
bootstrap();
