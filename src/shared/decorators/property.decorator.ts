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
