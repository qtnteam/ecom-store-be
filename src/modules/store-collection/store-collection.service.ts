import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, Repository } from 'typeorm';

import { Direction } from '@/constants/enum';
import { ExistFieldConstant } from '@/constants/exist-field.constant';
import { Attributes } from '@/languages';
import { PageDto } from '@/shared/common/page/page.dto';
import { ExistFieldException } from '@/shared/exception/exist-field.exception';

import { CreateStoreCollectionDto } from './dto/create-store-collection.dto';
import { RemoveStoreCollectionDto } from './dto/remove-store-collection.dto';
import { StoreCollectionDto } from './dto/store-collection.dto';
import { StoreCollectionPageOptionsDto } from './dto/store-collection-page-options.dto';
import { UpdateStoreCollectionDto } from './dto/update-store-collection.dto';
import { StoreCollection } from './entities/store-collection.entity';

@Injectable()
export class StoreCollectionService {
  constructor(
    @InjectRepository(StoreCollection)
    private readonly storeCollectionRepo: Repository<StoreCollection>,

    private readonly dataSource: DataSource,
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

    await this.checkDuplicate(storeId, createStoreCollectionDto.name);

    const newStoreCollection = this.storeCollectionRepo.create({
      storeId,
      index: storeCollection ? storeCollection.index + 1 : 0,
      ...createStoreCollectionDto,
    });
    await this.storeCollectionRepo.save(newStoreCollection);

    return newStoreCollection.toDto();
  }

  async update(
    id: string,
    storeId: string,
    updateStoreCollectionDto: UpdateStoreCollectionDto,
  ): Promise<StoreCollectionDto> {
    const { name, index } = updateStoreCollectionDto;
    const currentStoreCollection = await this.findOneById(id, storeId);

    if (name && currentStoreCollection.name !== name) {
      await this.checkDuplicate(storeId, name);
    }

    if (index && currentStoreCollection.index !== index) {
      await this.dragDropStoreCollection(
        currentStoreCollection.index,
        index,
        id,
        storeId,
        updateStoreCollectionDto,
      );
    } else {
      await this.storeCollectionRepo.update(id, updateStoreCollectionDto);
    }

    return this.findOneById(id, storeId);
  }

  async remove(
    storeId: string,
    removeStoreCollectionDto: RemoveStoreCollectionDto,
  ): Promise<void> {
    const { ids } = removeStoreCollectionDto;

    await this.storeCollectionRepo
      .createQueryBuilder()
      .softDelete()
      .where({ id: In(ids), storeId })
      .execute();
  }

  async findOneById(id: string, storeId: string): Promise<StoreCollectionDto> {
    const storeCollection = await this.storeCollectionRepo.findOneOrFail({
      where: { id, storeId },
      select: ['id', 'name', 'thumbnail', 'status', 'index'],
    });

    return storeCollection.toDto();
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

  private async checkDuplicate(storeId: string, name: string): Promise<void> {
    const checkDuplicateStoreCollection = await this.storeCollectionRepo.count({
      where: { storeId, name },
      select: ['id'],
    });

    if (checkDuplicateStoreCollection) {
      throw new ExistFieldException(
        ExistFieldConstant.StoreCollectionFieldExists,
        Attributes.StoreCollection,
      );
    }
  }

  private async dragDropStoreCollection(
    index: number,
    nextIndex: number,
    id: string,
    storeId: string,
    updateStoreCollectionDto: UpdateStoreCollectionDto,
  ): Promise<void> {
    const indexes: number[] = [];
    const increment = nextIndex > index ? '- 1' : '+ 1';
    const startIndex = nextIndex > index ? index + 1 : nextIndex;
    const endIndex = nextIndex > index ? nextIndex : index - 1;

    for (let i = startIndex; i <= endIndex; i++) {
      indexes.push(i);
    }

    await this.dataSource.transaction(async (entityManager: EntityManager) => {
      await entityManager
        .createQueryBuilder()
        .update(StoreCollection)
        .set({ index: () => `index ${increment}` })
        .where({ index: In(indexes), storeId })
        .execute();

      await entityManager.update(StoreCollection, id, {
        index: index,
        ...updateStoreCollectionDto,
      });
    });
  }
}
