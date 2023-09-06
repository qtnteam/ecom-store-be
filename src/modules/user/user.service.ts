// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { EntityExistException } from '@/shared/exception/entity-exist-exception';

import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserDto> {
    const { username, password, email, phoneNumber } = registerUserDto;
    const userExits = await this.userRepository.findOne({
      where: [
        { email: email },
        { username: username },
        { phoneNumber: phoneNumber },
      ],
    });

    if (userExits) {
      throw new EntityExistException();
    }

    const user: User = await this.userRepository.create({
      username,
      password,
      email,
      phoneNumber,
    });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return this.userRepository.save(user);
  }
}
