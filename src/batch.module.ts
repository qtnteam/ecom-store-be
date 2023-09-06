// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateCategoryCommand } from './commands/create-category.command';
import { DatabaseModule } from './database.module';
import { Category } from './modules/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), DatabaseModule],
  providers: [CreateCategoryCommand],
})
export class BatchModule {}
