// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [DatabaseModule, CategoryModule],
})
export class AppModule {}
