// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { LoggerConstant } from '@/constants/logger.constant';
import { ErrorMessage } from '@/languages';

import { ExceptionFilterType } from '../common/type';

@Catch(BadRequestException)
export class BadRequestExceptionFilter
  implements ExceptionFilter<HttpException>
{
  constructor(private readonly filterParam: ExceptionFilterType) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { logger, asyncRequestContext } = this.filterParam;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = HttpStatus.BAD_REQUEST;

    logger.log(
      LoggerConstant.badRequest,
      asyncRequestContext.getRequestIdStore(),
    );

    const error = {
      statusCode: status,
      message: exception.message || ErrorMessage[status],
    };

    asyncRequestContext.exit();

    return response.code(status).send(error);
  }
}
