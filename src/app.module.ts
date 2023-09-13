// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Module } from '@nestjs/common';

import { AsyncRequestContextModule } from './async-request-context/async-request-context.module';
import { DatabaseModule } from './database.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    AsyncRequestContextModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CategoryModule,
  ],
})
export class AppModule {}
