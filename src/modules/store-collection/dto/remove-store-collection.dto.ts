import { UUIDField } from '@/shared/decorators/field.decorator';

export class RemoveStoreCollectionDto {
  @UUIDField({ each: true })
  ids: string[];
}
