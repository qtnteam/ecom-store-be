import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUserId } from '@/shared/decorators/current-user-id.decorator';

import { CreateStoreDto } from './dto/create-store.dto';
import { StoreDto } from './dto/store.dto';
import { StoreService } from './store.service';

@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  @ApiBody({ type: CreateStoreDto })
  @ApiOkResponse({ type: StoreDto })
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @CurrentUserId() userId: string,
  ): Promise<StoreDto> {
    return this.storeService.createStore(createStoreDto, userId);
  }
}
