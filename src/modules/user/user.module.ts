import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { District } from '@/modules/district/entities/district.entity';

import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, District])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
