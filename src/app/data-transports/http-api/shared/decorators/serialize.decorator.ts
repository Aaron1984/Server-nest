import { UseInterceptors } from '@nestjs/common';
import { ResponseBaseDto } from '../dto-base/response-base.dto.abstract';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

export function SerializeResponseDto(dto: ResponseBaseDto): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}
