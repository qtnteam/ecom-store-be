import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TokenResponse } from '@/shared/common/type';

import { TokenDto } from './dto/token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
  ) {}

  async createToken(
    userId: string,
    tokenResponse: TokenResponse,
  ): Promise<TokenDto> {
    const token = this.tokenRepo.create({ userId, ...tokenResponse });

    return (await this.tokenRepo.save(token)).toDto();
  }
}
