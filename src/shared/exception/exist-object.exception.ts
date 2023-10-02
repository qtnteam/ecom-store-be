import { BadRequestException } from '@nestjs/common';

import { ValidationMessage } from '@/languages/vi';

export class ExistObjectException extends BadRequestException {
  constructor(error?: string) {
    super(error ? error : ValidationMessage.M_21_existObjectCommon);
  }
}
