import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@/shared/decorators/public.decorator';

import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}
