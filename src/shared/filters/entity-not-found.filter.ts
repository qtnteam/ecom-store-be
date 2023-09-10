// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { EntityNotFoundError } from 'typeorm';

import { LoggerConstant } from '@/constants/logger.constant';
import { ErrorMessage } from '@/languages';

@Catch(EntityNotFoundError, NotFoundException)
export class EntityNotFoundExceptionFilter
  implements ExceptionFilter<HttpException>
{
  constructor(private readonly logger: Logger) {}
  catch(_exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = HttpStatus.NOT_FOUND;

    // TODO config store later with contextId, ip, device, domain, userId, endpoint later
    this.logger.log(LoggerConstant.notFound);

    const error = {
      statusCode: status,
      message: ErrorMessage[status],
    };

    return response.code(status).send(error);
  }
}
