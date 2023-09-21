// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'identifier',
    });
  }

  async validate(identifier: string, password: string): Promise<AuthDto> {
    const user = await this.authService.validateUser(identifier, password);

    return plainToInstance(AuthDto, {
      id: user.id,
      username: user.username,
    });
  }
}
