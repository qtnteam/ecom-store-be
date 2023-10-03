import { EntityConstant } from '@/constants/entity.constant';
import { StoreCollectionStatusEnum } from '@/constants/enum';
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '@/shared/decorators/field.decorator';

export class UpdateStoreCollectionDto {
  @StringFieldOptional({
    maxLength: EntityConstant.MaxLengthStoreCollectionName,
  })
  name: string;

  @EnumFieldOptional(() => StoreCollectionStatusEnum)
  status: StoreCollectionStatusEnum;

  @NumberFieldOptional()
  index: number;
}
