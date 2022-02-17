import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { LoginUserDto, LoginUserDtoWithToken } from "./dto/login-user.dto";

import * as bcrypt from "bcrypt";
import { AuthSessionService, Session } from "./auth-session.service";
import { UserEntity } from "src/user/entity/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authSessionService: AuthSessionService,
  ) {}

  // async loginUser(loginUserDto: LoginUserDto) {
  //   const user = await this.userService.findUserByName(loginUserDto.name);
  //   if (!user)
  //     throw new NotFoundException(`Username ${loginUserDto.name} not found`);

  //   if (!(await bcrypt.compare(loginUserDto.password, user.password)))
  //     throw new ForbiddenException(`Password Incorrect`);

  //   return {
  //     token: this.authSessionService.createToken(user),
  //     name: user.name,
  //     id: user.id,
  //   };
  // }
  async loginUser(loginUserDto: LoginUserDto): Promise<LoginUserDtoWithToken> {
    const user = await this.userService.findUserByName(loginUserDto.name);
    if (!user)
      throw new NotFoundException(`Username ${loginUserDto.name} not found`);

    if (!(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new ForbiddenException(`Password Incorrect`);

    const sessionId = this.authSessionService.createSession(user);

    return {
      ...loginUserDto,
      token: this.authSessionService.createToken(sessionId),
    };
  }

  logoutUser(session: Session) {
    return this.authSessionService.endSession(session.id);
  }

  forceLogoutUser(user: UserEntity) {
    return this.authSessionService.killSession(user.id);
  }
}
