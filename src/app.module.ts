import { Module } from '@nestjs/common';

import { AsyncRequestContextModule } from './async-request-context/async-request-context.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { CategoryModule } from './modules/category/category.module';
import { StoreModule } from './modules/store/store.module';
import { StoreCollectionModule } from './modules/store-collection/store-collection.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AsyncRequestContextModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    CategoryModule,
    UserModule,
    StoreModule,
    StoreCollectionModule,
  ],
})
export class AppModule {}
