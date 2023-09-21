import { BadRequestException, Controller, Get } from '@nestjs/common';

import { CurrentUserId } from '@/shared/decorators/current-user-id.decorator';

// TODO: remove later
@Controller('test')
export class CategoryController {
  @Get()
  // TODO: demo
  test(@CurrentUserId() userId: string) {
    console.log(userId);
    throw new BadRequestException();
  }
}
