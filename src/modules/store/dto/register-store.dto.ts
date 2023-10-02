import { Expose } from 'class-transformer';

import { EntityConstant } from '@/constants/entity.constant';
import { StringField } from '@/shared/decorators/field.decorator';

export class RegisterStoreDto {
  @Expose()
  @StringField({
    maxLength: EntityConstant.EntityShortLength,
  })
  name: string;

  @Expose()
  @StringField({
    maxLength: EntityConstant.EntityShortLength,
  })
  identifier: string;

  @Expose()
  @StringField({
    nullable: true,
    maxLength: EntityConstant.EntityShortLength,
  })
  thumbnail: string;

  @Expose()
  @StringField({
    maxLength: EntityConstant.EntityShortLength,
  })
  description: string;
}
