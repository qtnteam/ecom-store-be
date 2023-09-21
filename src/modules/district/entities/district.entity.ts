import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
import { Province } from '@/modules/province/entities/province.entity';
import { Ward } from '@/modules/ward/entities/ward.entity';
import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { IAbstractEntity } from '@/shared/interfaces';

import { DistrictDto } from '../dto/district.dto';

@Entity('districts')
@Index(['name'])
@UseDto(DistrictDto)
export class District
  extends AbstractEntity<DistrictDto>
  implements IAbstractEntity<DistrictDto>
{
  @ManyToOne(() => Province, (province) => province.districts)
  @JoinColumn({ name: 'province_id', referencedColumnName: 'code' })
  province: Province;

  @OneToMany(() => Ward, (warn) => warn.district)
  wards: Ward[];

  @Column({
    name: 'province_id',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  provinceId: string;

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
