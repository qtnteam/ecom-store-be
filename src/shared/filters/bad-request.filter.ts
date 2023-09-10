// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { LoggerConstant } from '@/constants/logger.constant';
import { ErrorMessage } from '@/languages';

@Catch(BadRequestException)
export class BadRequestExceptionFilter
  implements ExceptionFilter<HttpException>
{
  constructor(private readonly logger: Logger) {}

  catch(_exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = HttpStatus.BAD_REQUEST;

    // TODO config store later with contextId, ip, device, domain, userId, endpoint later
    this.logger.log(LoggerConstant.badRequest);

    const error = {
      statusCode: status,
      message: ErrorMessage[status],
    };

    return response.code(status).send(error);
  }
}
