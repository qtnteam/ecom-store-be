import { UnprocessableEntityException } from '@nestjs/common';

import { ValidationMessage } from '@/languages/vi/validation.message';

export class ExistFieldException extends UnprocessableEntityException {
  constructor(fields?: string[], attributeName?: any) {
    const errors = fields.map((field) => ({
      property: field,
      errorMessage: ValidationMessage.M_20_existField.replace(
        '$field',
        attributeName ? attributeName[field] : field,
      ),
    }));

    super(errors);
  }
}
