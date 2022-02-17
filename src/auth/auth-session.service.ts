import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/user/entity/user.entity";
import { v4 as uuidv4 } from "uuid";

import * as jwt from "jsonwebtoken";
import { UserService } from "src/user/user.service";
import { ConfigService } from "src/config/config.service";
import { CacheService } from "src/cache/cache.service";

export interface Session {
  user: UserEntity;
  id: string;
  date: Date;
}

@Injectable()
export class AuthSessionService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}

  SESSION_TTL: number = this.configService.config.auth.SESSION_TTL;
  JWT_SECRET: string = this.configService.config.auth.JWT_SECRET;

  // createToken(user: UserEntity) {
  //   const date = +new Date();
  //   const id = user.id;

  //   return jwt.sign({ date, userId: id }, this.JWT_SECRET);
  // }

  // async parseToken(token: string): Promise<Session> {
  //   try {
  //     const payload = jwt.verify(token, this.JWT_SECRET) as jwt.JwtPayload;
  //     const date = +new Date();
  //     if (date - payload.date > this.EXPIRES_IN) return {};
  //     const user = await this.userService.findUserById(payload.userId);
  //     return { user };
  //   } catch (e) {
  //     return {};
  //   }
  // }

  createSession(user: UserEntity) {
    const id = uuidv4();
    this.cacheService.save<Session>(
      "auth-session-" + id,
      { id, user, date: new Date() },
      this.SESSION_TTL,
    );
    return id;
  }

  private querySession(sessionId: string) {
    return this.cacheService.get<Session>("auth-session-" + sessionId);
  }

  killSession(userId: number) {
    return this.cacheService.save<Date>(
      "auth-kill-session-" + userId,
      new Date(),
      0,
    );
  }

  private queryKillSession(userId: number) {
    return this.cacheService.get<Date>("auth-kill-session-" + userId);
  }

  endSession(sessionId: string) {
    return this.cacheService.del("auth-session-" + sessionId);
  }

  createToken(sessionId: string) {
    return jwt.sign(sessionId, this.JWT_SECRET);
  }

  // @return sessionId
  parseToken(token: string) {
    try {
      const payload = jwt.verify(token, this.JWT_SECRET) as string;
      return payload;
    } catch (e) {
      return "";
    }
  }

  async verifySession(sessionId: string) {
    const session = await this.querySession(sessionId);
    //  console.log("ddddd", session);
    if (!session) return null;
    const kill = await this.queryKillSession(session.user.id);
    if (!kill) return session;
    const date = session.date;
    if (kill >= session.date) return null;
    return session;
  }
}
