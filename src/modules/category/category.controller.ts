// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { BadRequestException, Controller, Get } from '@nestjs/common';

@Controller('test')
export class CategoryController {
  @Get()
  test() {
    throw new BadRequestException();
  }
}
