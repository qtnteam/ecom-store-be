// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Column, Entity, OneToMany } from 'typeorm';

import { Store } from '@/modules/store/entities/store.entity';
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
  @OneToMany(() => Store, (store) => store.user)
  stores: Store[];

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;
}
