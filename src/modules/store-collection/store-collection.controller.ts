import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { PageDto } from '@/shared/common/page/page.dto';
import { ApiPageOkResponse } from '@/shared/decorators/api-page-ok-response.decorator';
import { CurrentUserId } from '@/shared/decorators/current-user-id.decorator';

import { StoreService } from '../store/store.service';
import { CreateStoreCollectionDto } from './dto/create-store-collection.dto';
import { RemoveStoreCollectionDto } from './dto/remove-store-collection.dto';
import { StoreCollectionDto } from './dto/store-collection.dto';
import { StoreCollectionPageOptionsDto } from './dto/store-collection-page-options.dto';
import { UpdateStoreCollectionDto } from './dto/update-store-collection.dto';
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
    @CurrentUserId() userId: string,
    @Param('store_id') storeId: string,
    @Body() createStoreCollectionDto: CreateStoreCollectionDto,
  ): Promise<StoreCollectionDto> {
    await this.storeService.findOneBy({ id: storeId, userId });

    return this.storeCollectionService.create(
      storeId,
      createStoreCollectionDto,
    );
  }

  @Get()
  @ApiParam({ name: 'store_id', type: 'string' })
  @ApiBody({ type: StoreCollectionPageOptionsDto })
  @ApiPageOkResponse({ type: StoreCollectionDto })
  async findAll(
    @CurrentUserId() userId: string,
    @Param('store_id') storeId: string,
    @Query() query: StoreCollectionPageOptionsDto,
  ): Promise<PageDto<StoreCollectionDto>> {
    await this.storeService.findOneBy({ id: storeId, userId });

    return this.storeCollectionService.paginate(storeId, query);
  }

  @Get(':id')
  @ApiParam({ name: 'store_id', type: 'string' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: StoreCollectionDto })
  async find(
    @CurrentUserId() userId: string,
    @Param('store_id') storeId: string,
    @Param('id') id: string,
  ): Promise<StoreCollectionDto> {
    await this.storeService.findOneBy({ id: storeId, userId });

    return this.storeCollectionService.findOneById(id, storeId);
  }

  @Put(':id')
  @ApiParam({ name: 'store_id', type: 'string' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateStoreCollectionDto })
  @ApiOkResponse({ type: StoreCollectionDto })
  async update(
    @CurrentUserId() userId: string,
    @Param('store_id') storeId: string,
    @Param('id') id: string,
    @Body() updateStoreCollectionDto: UpdateStoreCollectionDto,
  ): Promise<StoreCollectionDto> {
    await this.storeService.findOneBy({ id: storeId, userId });

    return this.storeCollectionService.update(
      id,
      storeId,
      updateStoreCollectionDto,
    );
  }

  @Delete()
  @ApiParam({ name: 'store_id', type: 'string' })
  @ApiBody({ type: RemoveStoreCollectionDto })
  async remove(
    @CurrentUserId() userId: string,
    @Param('store_id') storeId: string,
    @Body() removeStoreCollectionDto: RemoveStoreCollectionDto,
  ): Promise<void> {
    await this.storeService.findOneBy({ id: storeId, userId });

    return this.storeCollectionService.remove(
      storeId,
      removeStoreCollectionDto,
    );
  }
}
