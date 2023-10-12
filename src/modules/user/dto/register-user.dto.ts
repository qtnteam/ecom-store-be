import { ApiProperty } from '@nestjs/swagger';

import { EntityConstant } from '@/constants/entity.constant';
import { EmailField, StringField } from '@/shared/decorators/field.decorator';
import {
  IsIdentifier,
  IsPassword,
  IsPhoneNumber,
  Match,
} from '@/shared/decorators/validator.decorator';
export class RegisterUserDto {
  public static readonly entity = 'User';

  @IsIdentifier()
  @StringField({
    minLength: EntityConstant.EntityPasswordMinLength,
    maxLength: EntityConstant.EntityPasswordMaxLength,
  })
  username: string;

  @IsPhoneNumber()
  @StringField()
  phoneNumber: string;

  @EmailField()
  email: string;

  @IsPassword()
  @StringField()
  password: string;

  @Match('password')
  @ApiProperty()
  confirmPassword: string;
}
