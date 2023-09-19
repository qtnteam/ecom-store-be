// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Module } from '@nestjs/common';

import { AsyncRequestContextModule } from './async-request-context/async-request-context.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AsyncRequestContextModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    CategoryModule,
    UserModule,
  ],
})
export class AppModule {}
