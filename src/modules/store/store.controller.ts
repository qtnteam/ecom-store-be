import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUserId } from '@/shared/decorators/current-user-id.decorator';

import { RegisterStoreDto } from './dto/register-store.dto';
import { StoreDto } from './dto/store.dto';
import { StoreService } from './store.service';

@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  @ApiOkResponse({ type: RegisterStoreDto })
  async create(
    @Body() registerStoreDto: RegisterStoreDto,
    @CurrentUserId() userId: string,
  ): Promise<StoreDto> {
    return this.storeService.registerStore(registerStoreDto, userId);
  }
}
