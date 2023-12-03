import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@adapter/common/filter/http-exception.filter';
import { LoggerInterceptor } from '@adapter/common/interceptor/logger.interceptor';
import { LoggerAdapter } from '@adapter/common/logger/logger.adapter';
import { ResponseInterceptor } from '@adapter/common/interceptor/response.interceptor';
import { EnvironmentStatus } from '@adapter/config/environment-config.validation';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initApplication(app);
  initInterceptors(app);
  initMongoose(app);
  initSwagger(app);

  await app.listen(3000);
}

function initApplication(app: INestApplication): void {
  // Middleware
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: ['*'],
    methods: ['*'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // Base routing
  app.setGlobalPrefix('/api');

  // Filter
  app.useGlobalFilters(new HttpExceptionFilter(new LoggerAdapter()));

  // Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // DTO 인스턴스로 자동 변환 활성화
    }),
  );
}

function initInterceptors(app: INestApplication): void {
  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerAdapter()));
  app.useGlobalInterceptors(new ResponseInterceptor());
}

function initMongoose(app: INestApplication): void {
  const connection: Connection = app.get(getConnectionToken());

  if (process.env.NODE_ENV === 'development') connection.set('debug', true);
}

function initSwagger(app: INestApplication): void {
  if (process.env.NODE_ENV === EnvironmentStatus.Production) return;

  const config = new DocumentBuilder()
    .setTitle(`LYFE Test [${process.env.NODE_ENV}]`)
    .setVersion(process.env.packageVersion)
    .addCookieAuth(
      'AccessToken',
      {
        type: 'apiKey',
        in: 'cookie',
        scheme: 'basic',
      },
      'AccessToken',
    )
    .addCookieAuth(
      'RefreshToken',
      {
        type: 'apiKey',
        in: 'cookie',
        scheme: 'basic',
      },
      'RefreshToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
