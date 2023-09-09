// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Transform, TransformOptions } from 'class-transformer';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { castArray, isNil } from 'lodash';

export function ToArray(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (isNil(value)) {
        return [];
      }

      return castArray(value);
    },
    { toClassOnly: true },
  );
}

export const ToLowerCase = (): PropertyDecorator => {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toLowerCase();
      }

      return value.map((v) => v.toLowerCase());
    },
    {
      // Expose this property only when transforming from plain to class instance.
      toClassOnly: true,
    },
  );
};

export const ToUpperCase = (): PropertyDecorator => {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toUpperCase();
      }

      return value.map((v) => v.toUpperCase());
    },
    {
      // Expose this property only when transforming from plain to class instance.
      toClassOnly: true,
    },
  );
};

export const ToBoolean = (options?: TransformOptions): PropertyDecorator => {
  return Transform(
    (params) => {
      switch (params.value) {
        case 'true':
          return true;
        case 'false':
          return false;
        case 1:
          return true;
        case 0:
          return false;
        default:
          return params.value;
      }
    },
    { toClassOnly: true, ...(options && options) },
  );
};

export const PhoneNumberSerializer = (
  defaultCountry: CountryCode = 'VN',
): PropertyDecorator => {
  return Transform(
    (params) => parsePhoneNumber(params.value as string, defaultCountry).number,
  );
};
