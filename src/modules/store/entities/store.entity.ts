import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
import { StoreAddress } from '@/modules/store-address/entities/store-address.entity';
import { User } from '@/modules/user/entities/user.entity';
import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { IAbstractEntity } from '@/shared/interfaces';

import { StoreDto } from '../dto/store.dto';

@Entity('stores')
@Index(['name', 'identifier'])
@UseDto(StoreDto)
export class Store
  extends AbstractEntity<StoreDto>
  implements IAbstractEntity<StoreDto>
{
  @ManyToOne(() => User, (user) => user.stores)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => StoreAddress, (storeAddress) => storeAddress.store)
  storeAddresses: StoreAddress[];

  @Column({
    name: 'user_id',
    type: 'varchar',
  })
  userId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  name: string;

  @Column({
    name: 'identifier',
    type: 'varchar',
    unique: true,
    length: EntityConstant.EntityShortLength,
  })
  identifier: string;

  @Column({
    name: 'thumbnail',
    type: 'varchar',
    nullable: true,
    length: EntityConstant.EntityShortLength,
  })
  thumbnail: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: EntityConstant.EntityMediumLength,
  })
  description: string;
}
