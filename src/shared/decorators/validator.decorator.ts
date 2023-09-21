// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  ArrayMaxSize as _ArrayMaxSize,
  ArrayMinSize as _ArrayMinSize,
  IsArray as _IsArray,
  IsBoolean as _IsBoolean,
  IsEnum as _IsEnum,
  IsInt as _IsInt,
  IsNotEmpty as _IsNotEmpty,
  IsNumber as _IsNumber,
  IsPhoneNumber as isPhoneNumber,
  IsString as _IsString,
  Max as _Max,
  MaxLength as _MaxLength,
  Min as _Min,
  MinLength as _MinLength,
  registerDecorator,
  ValidateIf,
  ValidationOptions,
} from 'class-validator';

import { RegexConstant } from '@/constants/regex.constant';
import { ValidationMessage } from '@/languages';

export const IsPassword = (options?: ValidationOptions): PropertyDecorator => {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isPassword',
      target: object.constructor,
      constraints: [],
      options: {
        ...options,
        message: ValidationMessage.M_13_passwordRule,
      },
      validator: {
        validate(value: string) {
          return RegexConstant.PasswordFormat.test(value);
        },
      },
    });
  };
};

export const IsUserName = (options?: ValidationOptions): PropertyDecorator => {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isUserName',
      target: object.constructor,
      constraints: [],
      options: {
        ...options,
        message: ValidationMessage.M_19_userNameRule,
      },
      validator: {
        validate(value: string) {
          return RegexConstant.UsernameFormat.test(value);
        },
      },
    });
  };
};

export const Match = (
  property: string,
  options?: ValidationOptions,
): PropertyDecorator => {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'match',
      target: object.constructor,
      constraints: [property],
      options: {
        ...options,
        message: ValidationMessage.M_14_passwordConfirmNotMatch,
      },
      validator: {
        validate(value, args) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
      },
    });
  };
};

export const IsNullable = (options?: ValidationOptions): PropertyDecorator => {
  return ValidateIf((_obj, value) => value !== null, options);
};

export const IsUndefinable = (
  options?: ValidationOptions,
): PropertyDecorator => {
  return ValidateIf((_obj, value) => value !== undefined, options);
};

export const IsInt = (
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _IsInt({ message: ValidationMessage.M_08_isInt, ...makeOption(options) });

export const IsNumber = (
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _IsNumber(
    {},
    { message: ValidationMessage.M_07_isNumber, ...makeOption(options) },
  );

export const Max = (
  maxValue: number,
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _Max(maxValue, {
    message:
      (options as ValidationOptions).message || ValidationMessage.M_04_lt,
    ...makeOption(
      typeof options === 'string'
        ? options
        : { ...options, ...{ context: { value: maxValue } } },
    ),
  });

export const Min = (
  minValue: number,
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _Min(minValue, {
    message:
      (options as ValidationOptions).message || ValidationMessage.M_02_gt,
    ...makeOption(
      typeof options === 'string'
        ? options
        : { ...options, ...{ context: { value: minValue } } },
    ),
  });

export const IsNotEmpty = (
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _IsNotEmpty({
    message: ValidationMessage.M_01_isNotNull,
    ...makeOption(options),
  });

export const IsArray = (
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _IsArray({
    message: ValidationMessage.isArray,
    ...makeOption(options),
  });

export const ArrayMinSize = (
  minValue: number,
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _ArrayMinSize(minValue, {
    message: ValidationMessage.arrayMinSize,
    ...makeOption(
      typeof options === 'string'
        ? options
        : { ...options, ...{ context: { value: minValue } } },
    ),
  });

export const ArrayMaxSize = (
  minValue: number,
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _ArrayMaxSize(minValue, {
    message: ValidationMessage.arrayMaxSize,
    ...makeOption(
      typeof options === 'string'
        ? options
        : { ...options, ...{ context: { value: minValue } } },
    ),
  });

export const IsString = (
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _IsString({ message: ValidationMessage.isString, ...makeOption(options) });

export const IsBoolean = (
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _IsBoolean({ message: ValidationMessage.isBoolean, ...makeOption(options) });

export const IsEnum = (
  enumValue: object,
  options?: string | ValidationOptions,
): PropertyDecorator => {
  return _IsEnum(enumValue, {
    message: ValidationMessage.M_06_inValid,
    ...makeOption(options),
  });
};

export function IsPhoneNumber(
  options?: ValidationOptions & {
    region?: Parameters<typeof isPhoneNumber>[0];
  },
): PropertyDecorator {
  return isPhoneNumber(options?.region, {
    message: ValidationMessage.M_16_phoneRule,
    ...options,
  });
}

export const MinLength = (
  minValue: number,
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _MinLength(minValue, {
    message: ValidationMessage.M_11_minLength,
    ...makeOption(
      typeof options === 'string'
        ? options
        : { ...options, ...{ context: { value: minValue } } },
    ),
  });

export const MaxLength = (
  maxValue: number,
  options?: string | ValidationOptions,
): PropertyDecorator =>
  _MaxLength(maxValue, {
    message: ValidationMessage.M_10_maxLength,
    ...makeOption(
      typeof options === 'string'
        ? options
        : { ...options, ...{ context: { value: maxValue } } },
    ),
  });

const makeOption = (
  options?: string | ValidationOptions,
): ValidationOptions => {
  return typeof options == 'string'
    ? {
        context: {
          name: options,
        },
      }
    : options;
};
