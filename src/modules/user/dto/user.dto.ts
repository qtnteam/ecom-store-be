// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AbstractDto } from '@/shared/common/dto/abstract.dto';

export class UserDto extends AbstractDto {
  @Expose()
  @ApiProperty()
  name: string;
}
