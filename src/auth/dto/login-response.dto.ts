import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  refreshToken: string;

  @ApiProperty()
  @Expose()
  accessTokenExpiresOn: Date;

  @ApiProperty()
  @Expose()
  refreshTokenExpiresOn: Date;
}
