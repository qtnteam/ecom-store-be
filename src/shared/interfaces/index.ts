import { ValidationError } from 'class-validator';

import { AbstractDto } from '../common/dto/abstract.dto';

// Entity interface
export interface IAbstractEntity<DTO extends AbstractDto, O = never> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  toDto(options?: O): DTO;
}

// Field interface
export interface IFieldOptions {
  each?: boolean;
  swagger?: boolean;
  nullable?: boolean;
  message?: string | undefined;
}

export interface INumberFieldOptions extends IFieldOptions {
  min?: number;
  max?: number;
  int?: boolean;
  isPositive?: boolean;
}

export interface IArrayFieldOptions extends IFieldOptions {
  minSize?: number;
  maxSize?: number;
  arrayUnique?: string;
}

export interface IStringFieldOptions extends IFieldOptions {
  minLength?: number;
  maxLength?: number;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
  messageIsNotEmpty?: string;
}

export type IBooleanFieldOptions = IFieldOptions;
export type IEnumFieldOptions = IFieldOptions;

// Validation interface
export interface IndexedValidationError extends ValidationError {
  index?: number;
}
