import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExistFieldConstant } from '@/constants/exist-field.constant';
import { ValidationMessage } from '@/languages/vi/validation.message';
import { ExistFieldException } from '@/shared/exception/exist-field.exception';
import { ExistObjectException } from '@/shared/exception/exist-object.exception';

import { RegisterStoreDto } from './dto/register-store.dto';
import { StoreDto } from './dto/store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async registerStore(
    registerStoreDto: RegisterStoreDto,
    userId: string,
  ): Promise<StoreDto> {
    const { name, identifier, thumbnail, description } = registerStoreDto;

    const userIsExistsStore = await this.storeRepository.findOne({
      where: [{ userId: userId }],
    });

    if (userIsExistsStore) {
      throw new ExistObjectException(ValidationMessage.M_22_existStore);
    }

    const storeIdentifierExits = await this.storeRepository.findOne({
      where: [{ identifier: identifier }],
    });

    if (storeIdentifierExits) {
      const fieldExists =
        ExistFieldConstant.StoreRegisterFieldCheckExists.filter(
          (field) => storeIdentifierExits[field] === eval(field),
        );
      throw new ExistFieldException(fieldExists);
    }

    const store = this.storeRepository.create({
      name: name,
      identifier: identifier,
      thumbnail: thumbnail,
      description: description,
      userId: userId,
    });

    await this.storeRepository.save(store);

    return store.toDto();
  }
}
