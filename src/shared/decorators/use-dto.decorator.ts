// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { AbstractEntity } from '../common/base.entity';
import { AbstractDto } from '../common/dto/abstract.dto';
import { Constructor } from '../common/type/constructor';

export function UseDto(
  dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
