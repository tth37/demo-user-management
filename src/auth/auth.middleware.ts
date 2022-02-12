import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "src/user/entity/user.entity";
import { AuthSessionService } from "./auth-session.service";

export interface Session {
  user?: UserEntity;
}

export interface RequestWithSession extends Request {
  session: Session;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authSessionService: AuthSessionService) {}
  async use(req: RequestWithSession, res: Response, next: NextFunction) {
    if (!req.headers["authorization"]) next();
    else {
      const token = req.headers["authorization"].split(" ")[1];
      const session = await this.authSessionService.parseToken(token);
      req.session = session;
      next();
    }
  }
}
