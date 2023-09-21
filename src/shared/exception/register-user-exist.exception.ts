import { BadRequestException } from '@nestjs/common';

import { ValidationMessage } from '@/languages/vi/validation.message';

export class RegisterUserExistException extends BadRequestException {
  constructor(fields?: string[]) {
    const messages = fields
      .map((field) =>
        ValidationMessage.M_20_registerUserExist.replace('$field', field),
      )
      .join(', ');
    super(messages);
  }
}
