// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { EntityNotFoundError } from 'typeorm';

import { LoggerConstant } from '@/constants/logger.constant';
import { ErrorMessage } from '@/languages';

import { ExceptionFilterType } from '../common/type';
import { createStore } from './../utils/app.util';

@Catch(EntityNotFoundError, NotFoundException)
export class EntityNotFoundExceptionFilter
  implements ExceptionFilter<HttpException>
{
  constructor(private readonly filterParam: ExceptionFilterType) {}
  catch(_exception: HttpException, host: ArgumentsHost) {
    const { logger, asyncRequestContext } = this.filterParam;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();
    const status = HttpStatus.NOT_FOUND;

    const store = createStore(request, asyncRequestContext);

    logger.warn(LoggerConstant.notFound, store);

    const error = {
      statusCode: status,
      message: ErrorMessage[status],
    };

    asyncRequestContext.exit();

    return response.code(status).send(error);
  }
}
