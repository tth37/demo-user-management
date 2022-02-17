import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CurrentSession } from "src/common/decorator/current-session.decorator";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { UserEntity } from "src/user/entity/user.entity";
import { Session } from "./auth-session.service";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("loginUser")
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post("logoutUser")
  logoutUser(@CurrentSession() currentSession: Session) {
    if (!currentSession)
      throw new BadRequestException(`You have not logged in`);
    return this.authService.logoutUser(currentSession);
  }

  @Post("forceLogoutUser")
  forceLogoutUser(@CurrentUser() currentUser: UserEntity) {
    if (!currentUser) throw new BadRequestException(`You have not logged in`);
    return this.authService.forceLogoutUser(currentUser);
  }
}
