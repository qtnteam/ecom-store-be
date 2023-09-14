// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { BadRequestException } from '@nestjs/common';

import { ValidationMessage } from '@/languages/vi/validation.message';

export class EntityExistException extends BadRequestException {
  constructor(errorMessage?: string) {
    super(errorMessage || ValidationMessage.M_20_errorExist);
  }
}
