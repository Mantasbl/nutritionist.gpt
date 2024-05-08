import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserType } from 'domain/types/user';

type Context = {
  user: UserType;
};

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Context>();
  const user: UserType = { email: request.user.email, id: request.user.id };
  return user;
});
