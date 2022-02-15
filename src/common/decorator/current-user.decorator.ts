import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "src/user/entity/user.entity";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (req.session) return req.session.user as UserEntity;
    else return undefined;
  },
);
