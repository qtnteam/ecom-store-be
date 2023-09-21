import { StringField } from '@/shared/decorators/field.decorator';

export class UserLoginDto {
  @StringField()
  identifier: string; // username | email | phoneNumber

  @StringField()
  password: string;
}
