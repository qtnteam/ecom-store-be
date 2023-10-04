import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsPositive } from 'class-validator';

import { ValidationMessage } from '@/languages';

import {
  IArrayFieldOptions,
  IBooleanFieldOptions,
  IEnumFieldOptions,
  IFieldOptions,
  INumberFieldOptions,
  IStringFieldOptions,
} from '../interfaces';
import { ApiEnumProperty } from './property.decorator';
import {
  PhoneNumberSerializer,
  ToArray,
  ToBoolean,
  ToLowerCase,
  ToUpperCase,
} from './transform.decorator';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNullable,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUndefinable,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from './validator.decorator';

export const NumberField = (
  options: Omit<ApiPropertyOptions, 'type'> &
    INumberFieldOptions &
    IArrayFieldOptions = {},
): PropertyDecorator => {
  const propertyDecorators = [Type(() => Number)];

  options.nullable
    ? propertyDecorators.push(IsNullable({ each: options.each }))
    : propertyDecorators.push(IsNotEmpty({ each: options.each }));

  if (options.swagger) {
    propertyDecorators.push(ApiProperty({ type: Number, ...options }));
  }

  if (options.each) {
    propertyDecorators.push(IsArray());
    options.minSize && propertyDecorators.push(ArrayMinSize(options.minSize));
    options.maxSize && propertyDecorators.push(ArrayMaxSize(options.maxSize));
  }

  options.int
    ? propertyDecorators.push(IsInt({ each: options.each }))
    : propertyDecorators.push(IsNumber({ each: options.each }));

  if (typeof options.min === 'number') {
    propertyDecorators.push(
      Min(options.min, {
        message: options.message || ValidationMessage.M_02_gt,
        each: options.each,
      }),
    );
  }

  if (typeof options.max === 'number') {
    propertyDecorators.push(
      Max(options.max, {
        message: options.message || ValidationMessage.M_04_lt,
        each: options.each,
      }),
    );
  }

  if (options.isPositive) {
    propertyDecorators.push(
      IsPositive({
        message: ValidationMessage.M_17_isPositive,
        each: options.each,
      }),
    );
  }

  return applyDecorators(...propertyDecorators);
};

export const NumberFieldOptional = (
  options: Omit<ApiPropertyOptions, 'type' | 'required'> &
    INumberFieldOptions &
    IArrayFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    NumberField({ required: false, nullable: true, ...options }),
  );
};

export const UUIDField = (
  options: Omit<ApiPropertyOptions, 'type'> & IFieldOptions = {},
): PropertyDecorator => {
  const propertyDecorators = [Type(() => String)];

  if (options.nullable) {
    propertyDecorators.push(
      IsNullable({ each: options.each }),
      IsOptional({ each: options.each }),
    );
  } else {
    const option = { each: options.each };

    propertyDecorators.push(IsNotEmpty(option));
  }

  propertyDecorators.push(IsUUID({ each: options.each }));

  if (options.swagger !== false) {
    propertyDecorators.push(
      ApiProperty({ type: String, ...options, isArray: options.each }),
    );
  }

  return applyDecorators(...propertyDecorators);
};

export const StringField = (
  options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator => {
  const propertyDecorators = [Type(() => String)];

  if (options.nullable) {
    propertyDecorators.push(
      IsNullable({ each: options.each }),
      IsOptional({ each: options.each }),
    );
  } else {
    const option = { each: options.each };

    if (options.messageIsNotEmpty) {
      Object.assign(option, { message: options.messageIsNotEmpty });
    }

    propertyDecorators.push(IsNotEmpty(option));
  }

  propertyDecorators.push(IsString({ each: options.each }));

  if (options.swagger !== false) {
    propertyDecorators.push(
      ApiProperty({ type: String, ...options, isArray: options.each }),
    );
  }

  if (options.minLength) {
    propertyDecorators.push(
      MinLength(options.minLength, { each: options.each }),
    );
  }

  if (options.maxLength) {
    propertyDecorators.push(
      MaxLength(options.maxLength, { each: options.each }),
    );
  }

  if (options.toLowerCase) {
    propertyDecorators.push(ToLowerCase());
  }

  if (options.toUpperCase) {
    propertyDecorators.push(ToUpperCase());
  }

  return applyDecorators(...propertyDecorators);
};

export const StringFieldOptional = (
  options: Omit<ApiPropertyOptions, 'type' | 'required'> &
    IStringFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    StringField({ required: false, nullable: true, ...options }),
  );
};

export const BooleanField = (
  options: Omit<ApiPropertyOptions, 'type'> & IBooleanFieldOptions = {},
): PropertyDecorator => {
  const propertyDecorators = [IsNotEmpty(), ToBoolean(), IsBoolean()];

  options.nullable
    ? propertyDecorators.push(
        IsNullable({ each: options.each }),
        IsOptional({ each: options.each }),
      )
    : propertyDecorators.push(IsNotEmpty({ each: options.each }));

  if (options.swagger !== false) {
    propertyDecorators.push(ApiProperty({ type: Boolean, ...options }));
  }

  return applyDecorators(...propertyDecorators);
};

export const BooleanFieldOptional = (
  options: Omit<ApiPropertyOptions, 'type' | 'required'> &
    IBooleanFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    BooleanField({ required: false, ...options, nullable: true }),
  );
};

export const EnumField = <TEnum extends object>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type' | 'enum' | 'enumName' | 'isArray'> &
    IEnumFieldOptions = {},
): PropertyDecorator => {
  const enumValue = getEnum();
  const decorators = [IsNotEmpty(), IsEnum(enumValue, { each: options.each })];

  options.nullable
    ? decorators.push(
        IsNullable({ each: options.each }),
        IsOptional({ each: options.each }),
      )
    : decorators.push(IsNotEmpty({ each: options.each }));

  if (options.each) {
    decorators.push(ToArray());
  }

  if (options.swagger !== false) {
    decorators.push(
      ApiEnumProperty(getEnum, { ...options, isArray: options.each }),
    );
  }

  return applyDecorators(...decorators);
};

export const EnumFieldOptional = <TEnum extends object>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type' | 'required' | 'enum' | 'enumName'> &
    IEnumFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    EnumField(getEnum, { required: false, ...options, nullable: true }),
  );
};

export const EmailField = (
  options: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    StringField({ toLowerCase: true, ...options }),
    IsEmail({}, { message: ValidationMessage.M_18_invalidEmail }),
  );
};

export const PhoneField = (
  options: Omit<ApiPropertyOptions, 'type'> & IFieldOptions = {},
): PropertyDecorator => {
  const decorators = [
    IsNotEmpty(),
    IsPhoneNumber({ region: 'VN' }),
    PhoneNumberSerializer(),
  ];

  options.nullable
    ? decorators.push(IsNullable())
    : decorators.push(IsNotEmpty({ each: options.each }));

  if (options.swagger !== false) {
    decorators.push(ApiProperty({ type: String, ...options }));
  }

  return applyDecorators(...decorators);
};

export const PhoneFieldOptional = (
  options: Omit<ApiPropertyOptions, 'type' | 'required'> & IFieldOptions = {},
): PropertyDecorator => {
  return applyDecorators(
    IsUndefinable(),
    PhoneField({ required: false, ...options }),
  );
};
