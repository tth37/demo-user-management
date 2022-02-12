import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthSessionService } from "./auth-session.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthSessionService],
  exports: [AuthSessionService],
})
export class AuthModule {}
