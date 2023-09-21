import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';

import { LoggerConstant } from '@/constants/logger.constant';
import { ErrorMessage } from '@/languages';

import { ExceptionFilterType } from '../common/type';

@Catch()
export class InternalServerFilter implements ExceptionFilter<HttpException> {
  constructor(private readonly filterParam: ExceptionFilterType) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { logger, asyncRequestContext } = this.filterParam;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    logger.log(
      LoggerConstant.internalServer,
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
