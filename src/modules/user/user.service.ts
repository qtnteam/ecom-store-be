// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { AppConstant } from '@/constants/app.constant';
import { EntityConstant } from '@/constants/entity.constant';
import { RegisterUserExistException } from '@/shared/exception/entity-exist-exception';

import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const { username, password, email, phoneNumber } = registerUserDto;
    const userExits = await this.userRepository.findOne({
      where: [
        { email: email },
        { username: username },
        { phoneNumber: phoneNumber },
      ],
    });

    if (userExits) {
      const fieldExists = EntityConstant.RegisterFieldCheckExists.filter(
        (field) => userExits[field] === eval(field),
      );
      throw new RegisterUserExistException(fieldExists);
    }

    const user = this.userRepository.create({
      username,
      password,
      email,
      phoneNumber,
    });

    user.password = bcrypt.hashSync(user.password, AppConstant.saltOrRounds);
    return (await this.userRepository.save(user)).toDto();
  }
}
