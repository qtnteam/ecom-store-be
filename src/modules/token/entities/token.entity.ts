import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { EntityConstant } from '@/constants/entity.constant';
import { User } from '@/modules/user/entities/user.entity';
import { AbstractEntity } from '@/shared/common/base.entity';
import { UseDto } from '@/shared/decorators/use-dto.decorator';
import { IAbstractEntity } from '@/shared/interfaces';

import { TokenDto } from '../dto/token.dto';

@Entity('tokens')
@UseDto(TokenDto)
export class Token
  extends AbstractEntity<TokenDto>
  implements IAbstractEntity<TokenDto>
{
  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'access_token',
    type: 'varchar',
    length: EntityConstant.EntityLongLength,
  })
  accessToken: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: EntityConstant.EntityLongLength,
  })
  refreshToken: string;

  @Column({
    name: 'access_token_expires_on',
    type: 'datetime',
  })
  accessTokenExpiresOn: Date;

  @Column({
    name: 'refresh_token_expires_on',
    type: 'datetime',
  })
  refreshTokenExpiresOn: Date;

  @Column({
    name: 'user_id',
    type: 'varchar',
  })
  userId: string;
}
