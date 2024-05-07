import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseBaseDto } from '../dto-base/response-base.dto.abstract';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ResponseBaseDto) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto as ClassConstructor<unknown>, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
