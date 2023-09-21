import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
import { Store } from '@/modules/store/entities/store.entity';
import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { StoreAddressEnum } from '@/shared/enum';
import { IAbstractEntity } from '@/shared/interfaces';

import { StoreAddressDto } from '../dto/store-address.dto';

@Entity('store-addresses')
@Index(['address'])
@UseDto(StoreAddressDto)
export class StoreAddress
  extends AbstractEntity<StoreAddressDto>
  implements IAbstractEntity<StoreAddressDto>
{
  @ManyToOne(() => Store, (store) => store.storeAddresses)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({
    name: 'store_id',
    type: 'varchar',
  })
  storeId: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  address: string;

  @Column({
    name: 'type',
    type: 'tinyint',
    default: StoreAddressEnum.Default,
    unsigned: true,
  })
  type: StoreAddressEnum;
}
