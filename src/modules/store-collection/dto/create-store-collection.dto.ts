import { Expose } from 'class-transformer';

import { EntityConstant } from '@/constants/entity.constant';
import { StringField } from '@/shared/decorators/field.decorator';

export class CreateStoreCollectionDto {
  @Expose()
  @StringField({ maxLength: EntityConstant.MaxLengthStoreCollectionName })
  name: string;
}
