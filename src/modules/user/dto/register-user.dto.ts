// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import {
  EmailField,
  PhoneField,
  StringField,
} from '@/shared/decorators/field.decorator';
import {
  IsPassword,
  IsUserName,
} from '@/shared/decorators/validator.decorator';
export class RegisterUserDto {
  @Expose()
  @ApiProperty()
  @StringField({ minLength: 8, maxLength: 50 })
  @IsUserName()
  username: string;

  @Expose()
  @ApiProperty()
  @PhoneField()
  phoneNumber: string;

  @Expose()
  @ApiProperty()
  @EmailField()
  email: string;

  @Expose()
  @ApiProperty()
  @IsPassword()
  password: string;
}
