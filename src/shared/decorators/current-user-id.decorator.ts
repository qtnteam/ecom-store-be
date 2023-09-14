// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    return req.user?.id;
  },
);
