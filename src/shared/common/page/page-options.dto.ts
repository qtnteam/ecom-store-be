import { Direction } from '@/constants/enum';
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '@/shared/decorators/field.decorator';

export class PageOptionsDto {
  @EnumFieldOptional(() => Direction, { default: Direction.ASC })
  readonly order?: Direction = Direction.ASC;

  @NumberFieldOptional({ minimum: 1, default: 1, int: true })
  readonly page?: number = 1;

  @NumberFieldOptional({ minimum: 1, maximum: 15, default: 15, int: true })
  readonly take?: number = 15;

  @StringFieldOptional()
  readonly q?: string;

  @StringFieldOptional()
  readonly orderBy?: string;
}
