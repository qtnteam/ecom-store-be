// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { BadRequestException } from '@nestjs/common';

import { ValidationMessage } from '@/languages/vi';

export class LoginFailException extends BadRequestException {
  constructor(error?: string) {
    super(ValidationMessage.M_15_invalidLogin, error);
  }
}
