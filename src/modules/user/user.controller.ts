import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@/shared/decorators/public.decorator';

import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Public()
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({ type: UserDto })
  async create(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
    return this.userService.registerUser(registerUserDto);
  }
}
