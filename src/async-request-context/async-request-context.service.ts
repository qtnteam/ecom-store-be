// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { AsyncLocalStorage } from 'async_hooks';

import { StoreContextType } from '@/shared/common/type';

export class AsyncRequestContext {
  constructor(
    readonly asyncLocalStorage: AsyncLocalStorage<StoreContextType>,
  ) {}

  getRequestIdStore(): StoreContextType {
    return this.asyncLocalStorage.getStore();
  }

  set(context: StoreContextType | undefined): boolean {
    try {
      this.asyncLocalStorage.enterWith(context);

      return true;
    } catch (err) {
      return false;
    }
  }

  exit(): void {
    this.set(undefined);
  }
}
