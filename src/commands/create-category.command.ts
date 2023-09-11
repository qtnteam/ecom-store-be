// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command, CommandRunner } from 'nest-commander';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DataSource, EntityManager, In, Repository } from 'typeorm';

import { Category } from '@/modules/category/entities/category.entity';
import { CategoryLevelEnum } from '@/shared/enum';

@Command({
  name: 'create-categories',
  description: 'Create example categories',
})
export class CreateCategoryCommand extends CommandRunner {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  async run(): Promise<void> {
    const parentCategory = {
      name: 'Parent category',
      displayName: 'Parent category',
      slug: 'parent-category',
      level: CategoryLevelEnum.Level1,
    };

    const childCategory = {
      name: 'Child category',
      displayName: 'Child category',
      slug: 'child-category',
      level: CategoryLevelEnum.Level2,
    };

    const category = await this.categoryRepository.findOne({
      where: {
        name: In([parentCategory.name, childCategory.name]),
      },
      select: ['id'],
    });

    if (category) {
      this.logger.error(`Category exist, please enter other category`);
      process.exit(1);
    }

    try {
      await this.dataSource.transaction(
        async (entityManager: EntityManager) => {
          const parent = await entityManager.save(Category, parentCategory);
          await entityManager.save(Category, {
            parentId: parent.id,
            ...childCategory,
          });
        },
      );
      process.exit(0);
    } catch (error) {
      this.logger.error(`Create example categories failed: ${error.message}`);
      process.exit(1);
    }
  }
}
