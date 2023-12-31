import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';

import { IAbstractEntity } from '../interfaces';
import { AbstractDto } from './dto/abstract.dto';
import { Constructor } from './type/constructor';

export abstract class AbstractEntity<
  DTO extends AbstractDto = AbstractDto,
  O = never,
> implements IAbstractEntity<DTO, O>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    precision: EntityConstant.TimePrecision,
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    precision: EntityConstant.TimePrecision,
    onUpdate: 'NOW()',
    default: () => 'NOW()',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime',
    precision: EntityConstant.TimePrecision,
  })
  deletedAt: Date;

  private dtoClass?: Constructor<DTO, [AbstractEntity, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new dtoClass(this, options);
  }
}
