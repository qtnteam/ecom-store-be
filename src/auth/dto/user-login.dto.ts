// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { StringField } from '@/shared/decorators/field.decorator';

export class UserLoginDto {
  @StringField()
  identifier: string; // username | email | phoneNumber

  @StringField()
  password: string;
}
