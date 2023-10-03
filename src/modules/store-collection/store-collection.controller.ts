import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { StoreService } from '../store/store.service';
import { CreateStoreCollectionDto } from './dto/create-store-collection.dto';
import { StoreCollectionDto } from './dto/store-collection.dto';
import { StoreCollectionService } from './store-collection.service';

@ApiTags('Store collection')
@Controller('store/:store_id/store-collection')
export class StoreCollectionController {
  constructor(
    private readonly storeCollectionService: StoreCollectionService,
    private readonly storeService: StoreService,
  ) {}

  @Post()
  @ApiBody({ type: CreateStoreCollectionDto })
  @ApiParam({ name: 'store_id', type: 'string' })
  @ApiOkResponse({ type: StoreCollectionDto })
  async create(
    @Param('store_id') storeId: string,
    @Body() createStoreCollectionDto: CreateStoreCollectionDto,
  ): Promise<StoreCollectionDto> {
    await this.storeService.findOneBy({ id: storeId });

    return this.storeCollectionService.create(
      storeId,
      createStoreCollectionDto,
    );
  }
}
