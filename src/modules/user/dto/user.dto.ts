import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AbstractDto } from '@/shared/common/dto/abstract.dto';

import { User } from '../entities/user.entity';

export class UserDto extends AbstractDto {
  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  phoneNumber: string;

  @Expose()
  @ApiProperty()
  email: string;

  constructor(user: User) {
    super(user);

    this.username = user.username;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
  }
}
