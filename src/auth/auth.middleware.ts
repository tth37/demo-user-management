import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { UserEntity } from "src/user/entity/user.entity";
import { AuthSessionService, Session } from "./auth-session.service";

export interface RequestWithSession extends Request {
  session: Session | null;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authSessionService: AuthSessionService) {}

  async use(req: RequestWithSession, rew: Response, next: NextFunction) {
    if (!req.headers["authorization"]) {
      req.session = null;
    } else {
      const token = req.headers["authorization"].split(" ")[1];
      const sessionId = this.authSessionService.parseToken(token);
      //  console.log(sessionId);
      req.session = await this.authSessionService.verifySession(sessionId);
    }
    console.log("Use session:", req.session);
    //  console.log("session", req.session);
    next();
  }
}
