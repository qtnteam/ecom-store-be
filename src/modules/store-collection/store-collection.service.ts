import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Direction } from '@/constants/enum';
import { ExistFieldConstant } from '@/constants/exist-field.constant';
import { Attributes } from '@/languages';
import { PageDto } from '@/shared/common/page/page.dto';
import { ExistFieldException } from '@/shared/exception/exist-field.exception';

import { CreateStoreCollectionDto } from './dto/create-store-collection.dto';
import { StoreCollectionDto } from './dto/store-collection.dto';
import { StoreCollectionPageOptionsDto } from './dto/store-collection-page-options.dto';
import { StoreCollection } from './entities/store-collection.entity';

@Injectable()
export class StoreCollectionService {
  constructor(
    @InjectRepository(StoreCollection)
    private readonly storeCollectionRepo: Repository<StoreCollection>,
  ) {}

  async create(
    storeId: string,
    createStoreCollectionDto: CreateStoreCollectionDto,
  ): Promise<StoreCollectionDto> {
    const storeCollection = await this.storeCollectionRepo.findOne({
      where: { storeId },
      order: { index: 'DESC' },
      select: ['index'],
    });

    const checkDuplicateStoreCollection = await this.storeCollectionRepo.count({
      where: { storeId, name: createStoreCollectionDto.name },
      select: ['id'],
    });

    if (checkDuplicateStoreCollection) {
      throw new ExistFieldException(
        ExistFieldConstant.StoreCollectionFieldExists,
        Attributes.StoreCollection,
      );
    }

    const newStoreCollection = this.storeCollectionRepo.create({
      storeId,
      index: storeCollection ? storeCollection.index + 1 : 0,
      ...createStoreCollectionDto,
    });
    await this.storeCollectionRepo.save(newStoreCollection);

    return newStoreCollection.toDto();
  }

  async paginate(
    storeId: string,
    pageOptionsDto: StoreCollectionPageOptionsDto,
  ): Promise<PageDto<StoreCollectionDto>> {
    const [storeCollections, pageMeta] = await this.storeCollectionRepo
      .createQueryBuilder('sc')
      .where({ storeId })
      .orderBy('sc.index', Direction.DESC)
      .select(['sc.id', 'sc.name', 'sc.thumbnail', 'sc.index', 'sc.status'])
      .paginate(pageOptionsDto);

    return storeCollections.toPageDto(pageMeta);
  }
}
