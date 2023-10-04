import { EntityConstant } from '@/constants/entity.constant';
import {
  StringField,
  StringFieldOptional,
} from '@/shared/decorators/field.decorator';
import { IsIdentifier } from '@/shared/decorators/validator.decorator';

export class CreateStoreDto {
  @StringField({
    maxLength: EntityConstant.EntityShortLength,
  })
  name: string;

  @StringField({
    maxLength: EntityConstant.EntityShortLength,
  })
  @IsIdentifier()
  identifier: string;

  @StringFieldOptional({
    maxLength: EntityConstant.EntityShortLength,
  })
  thumbnail: string;

  @StringField({
    maxLength: EntityConstant.EntityShortLength,
  })
  description: string;
}
