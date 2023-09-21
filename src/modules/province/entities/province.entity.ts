// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
import { District } from '@/modules/district/entities/district.entity';
import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { IAbstractEntity } from '@/shared/interfaces';

import { ProvinceDto } from '../dto/province.dto';

@Entity('provinces')
@Index(['name'])
@UseDto(ProvinceDto)
export class Province
  extends AbstractEntity<ProvinceDto>
  implements IAbstractEntity<ProvinceDto>
{
  @OneToMany(() => District, (district) => district.province)
  districts: District[];

  @Column({
    name: 'code',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
    unique: true,
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  name: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  slug: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  type: string;
}
