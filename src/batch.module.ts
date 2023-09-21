// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { District } from '@/modules/district/entities/district.entity';
import { Province } from '@/modules/province/entities/province.entity';
import { Ward } from '@/modules/ward/entities/ward.entity';

import { AsyncRequestContextModule } from './async-request-context/async-request-context.module';
import { CreateCategoryCommand } from './commands/create-category.command';
import { ImportMasterAddressCommand } from './commands/import-master-address.command';
import { DatabaseModule } from './database.module';
import { Category } from './modules/category/entities/category.entity';

@Module({
  imports: [
    AsyncRequestContextModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Category, Province, District, Ward]),
    DatabaseModule,
  ],
  providers: [CreateCategoryCommand, ImportMasterAddressCommand],
})
export class BatchModule {}
