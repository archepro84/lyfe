import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '@domain/common/exception/base.exception';
import { LoggerPort } from '@application/common/logger/logger.port';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  constructor(private readonly logger: LoggerPort) {}

  catch(exception: any, host: ArgumentsHost) {
    const { response, request } = this.getContextData(host);
    const { message, statusCode } = this.getMessageWithStatusCode(exception);

    const responseData = {
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    this.logExceptionMessage(request, message, statusCode, exception);
    response.status(statusCode).json(responseData);
  }

  private getContextData(host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request: any = ctx.getRequest();

    return { response, request };
  }

  private getMessageWithStatusCode(exception: any): {
    statusCode: number;
    message: string;
  } {
    const statusCode = this.getStatusCode(exception);
    const message = this.getExceptionMessage(exception);

    return { statusCode, message };
  }

  private getStatusCode(exception: any): number {
    if (this.isBusinessException(exception)) {
      return (exception as BaseException).status;
    }
    if (this.isHttpException(exception)) {
      return (exception as HttpException).getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getExceptionMessage(exception: any): string {
    if (this.isHttpException(exception)) {
      return exception.getResponse().message;
    }
    return exception.message;
  }

  private isBusinessException(exception: any): boolean {
    return exception instanceof BaseException;
  }

  private isHttpException(exception: any): boolean {
    return exception instanceof HttpException;
  }

  private logExceptionMessage(
    request: any,
    message: string,
    status: number,
    exception: any,
  ) {
    if (this.isBusinessException(exception)) {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method: ${request.method} status: ${status} message: ${message}`,
      );
    } else {
      this.logger.error(
        `End Request for ${request.path}`,
        `method: ${request.method} status: ${status} message: ${message}`,
        exception.stack,
      );
    }
  }
}
