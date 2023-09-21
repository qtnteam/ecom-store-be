import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;
}
