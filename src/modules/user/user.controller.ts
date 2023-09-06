// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Post()
  @ApiOkResponse({ type: RegisterUserDto })
  async create(@Body() registerUserDto: RegisterUserDto) {
    return this.usersServices.registerUser(registerUserDto);
  }
}
