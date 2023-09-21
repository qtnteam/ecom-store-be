import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserDto } from '@/modules/user/dto/user.dto';
import { UserService } from '@/modules/user/user.service';
import { Payload } from '@/shared/common/type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('jwtSecretKey'),
    });
  }

  async validate(req: Request, payload: Payload): Promise<UserDto> {
    const user = await this.userService.findUserActive(
      payload.username,
      ExtractJwt.fromAuthHeaderAsBearerToken()(req),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    Object.assign(req, { user });

    return user.toDto();
  }
}
