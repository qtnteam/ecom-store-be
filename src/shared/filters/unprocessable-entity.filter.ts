// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import * as isEmpty from 'lodash/isEmpty';

import { LoggerConstant } from '@/constants/logger.constant';
import { Attributes, ErrorMessage } from '@/languages';

import { ValidationErrorFilterType } from '../common/type';
import { IndexedValidationError } from '../interfaces';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter
  implements ExceptionFilter<HttpException>
{
  constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = HttpStatus.UNPROCESSABLE_ENTITY;

    const validationErrors =
      exception.getResponse() as ValidationErrorFilterType;

    // TODO config store later with contextId, ip, device, domain, userId, endpoint later
    this.logger.log(LoggerConstant.unprocessable);

    const messages = this.validationFilter(validationErrors.message);

    const error = {
      statusCode: status,
      message: ErrorMessage[status],
      details: messages,
    };

    return response.code(status).send(error);
  }

  private validationFilter(validationErrors: IndexedValidationError[]) {
    return validationErrors.map((error) => {
      const { property, constraints, contexts, children, target, index } =
        error;

      if (!constraints && children && !isEmpty(children)) {
        return {
          index,
          property,
          message: this.validationFilter(children),
        };
      }

      const { message } = this.buildErrorMessage(
        property,
        constraints,
        contexts,
        target,
      );

      return {
        index,
        property,
        message,
      };
    });
  }

  private buildErrorMessage(
    property: string,
    constraints: Record<string, string>,
    context: any,
    target: object,
  ) {
    const key = Object.keys(constraints)[0];
    const attribute = this.getAttributeName(property, target);
    const message = this.formatErrorMessage(
      constraints[key],
      attribute,
      context?.[key]?.value,
    );

    return { key, message };
  }

  private getAttributeName(property: string, target: object) {
    const entityName = (target?.constructor as any)?.entity;
    const attributes = Attributes[entityName];

    return attributes?.[property] || property;
  }

  private formatErrorMessage(message: string, attribute: string, $1: any) {
    let formattedMessage = message.replace('$field', attribute);
    // TODO : refactor this if message has more than one $1
    if ($1) {
      formattedMessage = formattedMessage.replace('$1', `${$1}`);
    }

    return formattedMessage;
  }
}
