// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { AsyncLocalStorage } from 'async_hooks';
import { ValidationError } from 'class-validator';
import { Logger } from 'winston';

import { AsyncRequestContext } from '@/async-request-context/async-request-context.service';

export type ValidationErrorFilterType = {
  message: ValidationError[];
  error: string;
};

export type StoreContextType = {
  contextId: string | undefined;
  ip: string | undefined;
  endpoint: string | undefined;
  device: string | undefined;
  domain: string | undefined;
  userId?: number | undefined;
  method?: string | undefined;
};

export type AsyncContextModuleOptions = {
  isGlobal?: boolean;
  asyncLocalStorageInstance?: AsyncLocalStorage<any>;
};

export type ExceptionFilterType = {
  asyncRequestContext: AsyncRequestContext;
  logger: Logger;
};

export type ObjectType = { [key: string]: any };
