import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@common/filter/http-exception.filter';
import { LoggerInterceptor } from '@common/interceptor/logger.interceptor';
import { LoggerAdapter } from '@adapter/common/logger/logger.adapter';
import { ResponseInterceptor } from '@common/interceptor/response.interceptor';
import { EnvironmentStatus } from '@common/config/environment-config.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initApplication(app);
  initInterceptors(app);
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
  });

  // Base routing
  app.setGlobalPrefix('/api');

  // Filter
  app.useGlobalFilters(new HttpExceptionFilter(new LoggerAdapter()));

  // Pipe
  app.useGlobalPipes(new ValidationPipe());
}

function initInterceptors(app: INestApplication): void {
  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerAdapter()));
  app.useGlobalInterceptors(new ResponseInterceptor());
}

function initSwagger(app: INestApplication): void {
  if (process.env.NODE_ENV === EnvironmentStatus.Production) return;

  const config = new DocumentBuilder()
    .setTitle(`LYFE Test [${process.env.NODE_ENV}]`)
    .setVersion(process.env.packageVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
