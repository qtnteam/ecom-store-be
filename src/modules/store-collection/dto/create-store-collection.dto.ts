import { EntityConstant } from '@/constants/entity.constant';
import { StringField } from '@/shared/decorators/field.decorator';

export class CreateStoreCollectionDto {
  @StringField({ maxLength: EntityConstant.MaxLengthStoreCollectionName })
  name: string;
}
