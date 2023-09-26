import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreCollection } from '@/modules/store-collection/entities/store-collection.entity';

import { StoreModule } from '../store/store.module';
import { StoreCollectionController } from './store-collection.controller';
import { StoreCollectionService } from './store-collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreCollection]), StoreModule],
  controllers: [StoreCollectionController],
  providers: [StoreCollectionService],
})
export class StoreCollectionModule {}
