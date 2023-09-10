// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
import { CategoryLevelEnum } from '@/constants/enum';
import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { IAbstractEntity } from '@/shared/interfaces';

import { CategoryDto } from '../dto/category.dto';

@Entity('categories')
@UseDto(CategoryDto)
export class Category
  extends AbstractEntity<CategoryDto>
  implements IAbstractEntity<CategoryDto>
{
  @ManyToOne(() => Category, (category) => category.childCategories)
  @JoinColumn({ name: 'parent_id' })
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  childCategories: Category[];

  @Column({
    name: 'name',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  name: string;

  @Column({
    name: 'display_name',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  displayName: string;

  @Column({
    name: 'parent_id',
    type: 'varchar',
    nullable: true,
  })
  parentId: string;

  @Column({
    name: 'level',
    type: 'tinyint',
    default: CategoryLevelEnum.Level1,
    unsigned: true,
  })
  level: CategoryLevelEnum;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  slug: string;
}
