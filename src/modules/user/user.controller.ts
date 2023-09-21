import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOkResponse({ type: RegisterUserDto })
  async create(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
    return this.userService.registerUser(registerUserDto);
  }

  @Get()
  async test() {
    return this.userService.test();
  }
}
