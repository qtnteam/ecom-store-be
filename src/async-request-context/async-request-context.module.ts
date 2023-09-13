// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { DynamicModule } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

import { AsyncContextModuleOptions } from '@/shared/common/type';

import { AsyncRequestContext } from './async-request-context.service';

export class AsyncRequestContextModule {
  static forRoot(options?: AsyncContextModuleOptions): DynamicModule {
    const isGlobal = options?.isGlobal ?? true;
    const asyncLocalStorageInstance =
      options?.asyncLocalStorageInstance ?? new AsyncLocalStorage();

    return {
      module: AsyncRequestContextModule,
      global: isGlobal,
      providers: [
        {
          provide: AsyncRequestContext,
          useValue: new AsyncRequestContext(asyncLocalStorageInstance),
        },
      ],
      exports: [AsyncRequestContext],
    };
  }
}
