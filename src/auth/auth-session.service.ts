import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/user/entity/user.entity";
import { Session } from "./auth.middleware";
import { EXPIRES_IN, JWT_SECRET } from "./jwt-constants";

import * as jwt from "jsonwebtoken";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthSessionService {
  constructor(private readonly userService: UserService) {}

  createToken(user: UserEntity) {
    const date = +new Date();
    const id = user.id;

    return jwt.sign({ date, userId: id }, JWT_SECRET);
  }

  async parseToken(token: string): Promise<Session> {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      const date = +new Date();
      if (date - payload.date > EXPIRES_IN) return {};
      const user = await this.userService.findUserById(payload.userId);
      return { user };
    } catch (e) {
      return {};
    }
  }
}
