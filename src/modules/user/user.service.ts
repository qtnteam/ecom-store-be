import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { AppConstant } from '@/constants/app.constant';
import { EntityConstant } from '@/constants/entity.constant';
import { District } from '@/modules/district/entities/district.entity';
import { RegisterUserExistException } from '@/shared/exception/register-user-exist.exception';

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
      queryBuilder.andWhere('u.access_token = :accessToken', { accessToken });
    }

    return queryBuilder.getOne();
  }

  async updateToken(
    id: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(id, { accessToken, refreshToken });
  }

  async test(provinceId = '01') {
    const de = await this.dRepository
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.province', 'p')
      .where('a.provinceId = :provinceId', { provinceId })
      .getMany();

    return de;
  }
}
