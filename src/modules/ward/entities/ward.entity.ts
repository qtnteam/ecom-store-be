import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
import { District } from '@/modules/district/entities/district.entity';
import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { IAbstractEntity } from '@/shared/interfaces';

import { WardDto } from '../dto/ward.dto';

@Entity('wards')
@Index(['name'])
@UseDto(WardDto)
export class Ward
  extends AbstractEntity<WardDto>
  implements IAbstractEntity<WardDto>
{
  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({ name: 'district_id', referencedColumnName: 'code' })
  district: District;

  @Column({
    name: 'district_id',
    type: 'varchar',
    length: EntityConstant.EntityShortLength,
  })
  districtId: string;

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
