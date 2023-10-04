import { ApiProperty } from '@nestjs/swagger';

import { EntityConstant } from '@/constants/entity.constant';
import {
  EmailField,
  PhoneField,
  StringField,
} from '@/shared/decorators/field.decorator';
import {
  IsIdentifier,
  IsPassword,
} from '@/shared/decorators/validator.decorator';
export class RegisterUserDto {
  @StringField({
    minLength: EntityConstant.EntityPasswordMinLength,
    maxLength: EntityConstant.EntityPasswordMaxLength,
  })
  @IsIdentifier()
  username: string;

  @PhoneField()
  phoneNumber: string;

  @EmailField()
  email: string;

  @IsPassword()
  @ApiProperty()
  password: string;
}
