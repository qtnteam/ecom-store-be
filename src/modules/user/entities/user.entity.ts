// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { IAbstractEntity } from '@/shared/interfaces';

import { UserDto } from '../dto/user.dto';

@Entity('users')
@UseDto(UserDto)
export class User
  extends AbstractEntity<UserDto>
  implements IAbstractEntity<UserDto>
{
  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;
}
