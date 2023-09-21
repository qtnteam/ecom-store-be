// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { LoggerConstant } from '@/constants/logger.constant';
import { ErrorMessage } from '@/languages';

import { ExceptionFilterType } from '../common/type';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter
  implements ExceptionFilter<HttpException>
{
  constructor(private readonly filterParam: ExceptionFilterType) {}
  catch(_exception: HttpException, host: ArgumentsHost) {
    const { logger, asyncRequestContext } = this.filterParam;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = HttpStatus.FORBIDDEN;

    logger.log(
      LoggerConstant.forbidden,
      asyncRequestContext.getRequestIdStore(),
    );

    const error = {
      statusCode: status,
      message: ErrorMessage[status],
    };

    asyncRequestContext.exit();

    return response.code(status).send(error);
  }
}
