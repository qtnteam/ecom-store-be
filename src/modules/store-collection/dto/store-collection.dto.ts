import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { StoreCollectionStatusEnum } from '@/constants/enum';
import { AbstractDto } from '@/shared/common/dto/abstract.dto';

import { StoreCollection } from '../entities/store-collection.entity';

export class StoreCollectionDto extends AbstractDto {
  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  thumbnail: string;

  @Expose()
  @ApiProperty()
  index: number;

  @Expose()
  @ApiProperty()
  status: StoreCollectionStatusEnum;

  constructor(storeCollection: StoreCollection) {
    super(storeCollection);
    this.name = storeCollection.name;
    this.thumbnail = storeCollection.thumbnail;
    this.index = storeCollection.index;
    this.status = storeCollection.status;
  }
}
