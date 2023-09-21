import { BadRequestException } from '@nestjs/common';

import { ValidationMessage } from '@/languages/vi';

export class LoginFailException extends BadRequestException {
  constructor(error?: string) {
    super(ValidationMessage.M_15_invalidLogin, error);
  }
}
