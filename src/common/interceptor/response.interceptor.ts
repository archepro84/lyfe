import { ApiProperty } from '@nestjs/swagger';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class ResponseFormat<T> {
  @ApiProperty()
  path: string;

  @ApiProperty()
  method: string;

  @ApiProperty()
  duration: string;

  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((data) => ({
        path: request.path,
        method: request.method,
        duration: `${Date.now() - now}ms`,
        data,
      })),
    );
  }
}
