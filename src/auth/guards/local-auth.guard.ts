// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import {
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { UserLoginDto } from '../dto/user-login.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const body = context.switchToHttp().getRequest().body || {};

    const loginDto: UserLoginDto = plainToInstance(UserLoginDto, body);

    // Get list of errors
    const errors: ValidationError[] = await validate(loginDto);

    if (errors.length) {
      throw new UnprocessableEntityException(errors);
    }

    return (await super.canActivate(context)) as boolean;
  }
}
