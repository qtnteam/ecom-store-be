import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
  @Expose()
  @StringField({
    minLength: EntityConstant.EntityPasswordMinLength,
    maxLength: EntityConstant.EntityPasswordMaxLength,
  })
  @IsIdentifier()
  username: string;

  @Expose()
  @PhoneField()
  phoneNumber: string;

  @Expose()
  @EmailField()
  email: string;

  @Expose()
  @IsPassword()
  @ApiProperty()
  password: string;
}
