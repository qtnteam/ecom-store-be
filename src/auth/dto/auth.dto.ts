// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;
}
