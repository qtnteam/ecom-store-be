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

export type Payload = {
  username: string;
  exp: number;
  iat: number;
  sub: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresOn: Date;
  refreshTokenExpiresOn: Date;
};
