import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AbstractDto } from '@/shared/common/dto/abstract.dto';

import { Token } from '../entities/token.entity';

export class TokenDto extends AbstractDto {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;

  @Expose()
  @ApiProperty()
  accessTokenExpiresOn: Date;

  @Expose()
  @ApiProperty()
  refreshTokenExpiresOn: Date;

  constructor(token: Token) {
    super(token);

    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;
    this.accessTokenExpiresOn = token.accessTokenExpiresOn;
    this.refreshTokenExpiresOn = token.refreshTokenExpiresOn;
  }
}
