import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Session } from "src/auth/auth-session.service";

export const CurrentSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (req.session) return req.session as Session;
    else return undefined;
  },
);
