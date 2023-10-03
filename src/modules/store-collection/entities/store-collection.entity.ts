import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
import { Store } from '@/modules/store/entities/store.entity';
import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { IAbstractEntity } from '@/shared/interfaces';

import { StoreCollectionDto } from '../dto/store-collection.dto';
import { StoreCollectionStatusEnum } from './../../../constants/enum';

@Entity('store-collections')
@Index(['name'])
@UseDto(StoreCollectionDto)
export class StoreCollection
  extends AbstractEntity<StoreCollectionDto>
  implements IAbstractEntity<StoreCollectionDto>
{
  @ManyToOne(() => Store, (store) => store.storeCollections)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({
    name: 'name',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  name: string;

  @Column({
    name: 'thumbnail',
    type: 'varchar',
    nullable: true,
    length: EntityConstant.EntityLongLength,
  })
  thumbnail: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    unsigned: true,
    default: StoreCollectionStatusEnum.Off,
  })
  status: StoreCollectionStatusEnum;

  @Column({
    name: 'index',
    type: 'int',
    default: EntityConstant.DefaultIndexStoreCollection,
  })
  index: number;

  @Column({
    name: 'store_id',
    type: 'varchar',
  })
  storeId: string;
}
