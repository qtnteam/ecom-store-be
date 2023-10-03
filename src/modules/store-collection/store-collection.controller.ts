import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { PageDto } from '@/shared/common/page/page.dto';
import { ApiPageOkResponse } from '@/shared/decorators/api-page-ok-response.decorator';

import { StoreService } from '../store/store.service';
import { CreateStoreCollectionDto } from './dto/create-store-collection.dto';
import { StoreCollectionDto } from './dto/store-collection.dto';
import { StoreCollectionPageOptionsDto } from './dto/store-collection-page-options.dto';
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

  @Get()
  @ApiParam({ name: 'store_id', type: 'string' })
  @ApiPageOkResponse({ type: StoreCollectionDto })
  async findAll(
    @Param('store_id') storeId: string,
    @Query() query: StoreCollectionPageOptionsDto,
  ): Promise<PageDto<StoreCollectionDto>> {
    await this.storeService.findOneBy({ id: storeId });

    return this.storeCollectionService.paginate(storeId, query);
  }
}
