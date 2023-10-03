import { BadRequestException } from '@nestjs/common';

import { ValidationMessage } from '@/languages/vi/validation.message';

export class ExistFieldException extends BadRequestException {
  constructor(fields?: string[], attributeName?: any) {
    const messages = fields
      .map((field) =>
        ValidationMessage.M_20_existField.replace(
          '$field',
          attributeName ? attributeName[field] : field,
        ),
      )
      .join(', ');
    super(messages);
  }
}