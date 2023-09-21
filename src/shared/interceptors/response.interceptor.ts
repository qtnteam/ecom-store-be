// gkc_haCallHandler, ExecutionContext, sh_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { LoggerConstant } from '@/constants/logger.constant';

import { ExceptionFilterType } from '../common/type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly filterParam: ExceptionFilterType) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const { logger, asyncRequestContext } = this.filterParam;
    return next.handle().pipe(
      tap(() => {
        logger.log(
          LoggerConstant.success,
          asyncRequestContext.getRequestIdStore(),
        );
        asyncRequestContext.exit();
      }),
    );
  }
}
