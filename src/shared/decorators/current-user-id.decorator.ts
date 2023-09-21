import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    return req.user?.id;
  },
);
