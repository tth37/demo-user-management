import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { LoginUserDto } from "./dto/login-user.dto";

import * as bcrypt from "bcrypt";
import { AuthSessionService } from "./auth-session.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authSessionService: AuthSessionService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByName(loginUserDto.name);
    if (!user)
      throw new NotFoundException(`Username ${loginUserDto.name} not found`);

    if (!(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new ForbiddenException(`Password Incorrect`);

    return {
      token: this.authSessionService.createToken(user),
      name: user.name,
      id: user.id,
    };
  }
}
