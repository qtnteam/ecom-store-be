import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { AppConstant } from '@/constants/app.constant';
import { ExistFieldConstant } from '@/constants/exist-field.constant';
import { District } from '@/modules/district/entities/district.entity';
import { ExistFieldException } from '@/shared/exception/exist-field.exception';

import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(District)
    private readonly dRepository: Repository<District>,
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
      const fieldExists = ExistFieldConstant.RegisterFieldCheckExists.filter(
        (field) => userExits[field] === eval(field),
      );
      throw new ExistFieldException(fieldExists);
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

  async findUserActive(
    identifier: string,
    accessToken?: string,
  ): Promise<User> {
    const queryBuilder = await this.userRepository.createQueryBuilder('u');

    queryBuilder.where(
      '(u.username = :identifier OR u.email = :identifier OR u.phone_number = :identifier)',
      { identifier },
    );

    if (accessToken) {
      queryBuilder
        .innerJoin('u.tokens', 'token')
        .andWhere('token.access_token = :accessToken', { accessToken })
        .andWhere('token.access_token_expires_on >= :currentDate', {
          currentDate: new Date(),
        });
    }

    return queryBuilder.getOne();
  }
}
