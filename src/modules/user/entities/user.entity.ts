// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Column, Entity, OneToMany } from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
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
    name: 'username',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  username: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: EntityConstant.EntityPhoneLength,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  password: string;
}
