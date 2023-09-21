// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { JwtConstant } from '@/constants/app.constant';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
import { Payload } from '@/shared/common/type';
import { LoginFailException } from '@/shared/exception/login-fail.exception';

import { AuthDto } from './dto/auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string): Promise<User> {
    const user = await this.userService.findUserActive(identifier);

    if (!user || !compareSync(password, user.password)) {
      throw new LoginFailException();
    }

    return user;
  }

  async login(user: AuthDto): Promise<LoginResponseDto> {
    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: JwtConstant.JwtRefreshExpiresIn,
    });
    const accessTokenExpiresOn = new Date(
      (this.jwtService.decode(accessToken) as Payload).exp * 1000,
    );
    const refreshTokenExpiresOn = new Date(
      (this.jwtService.decode(refreshToken) as Payload).exp * 1000,
    );

    await this.userService.updateToken(user.id, accessToken, refreshToken);

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresOn,
      refreshTokenExpiresOn,
    };
  }
}
