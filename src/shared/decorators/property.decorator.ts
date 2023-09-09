// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export const ApiEnumProperty = <TEnum>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type'> & { each?: boolean } = {},
): PropertyDecorator => {
  const enumValue = getEnum() as any;

  return ApiProperty({
    type: 'enum',
    enum: enumValue,
    ...options,
  });
};
