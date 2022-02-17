import { Module } from "@nestjs/common";
import { CustomCacheModule } from "src/cache/cache.module";
import { ConfigModule } from "src/config/config.module";
import { UserModule } from "src/user/user.module";
import { AuthSessionService } from "./auth-session.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModule, ConfigModule, CustomCacheModule],
  controllers: [AuthController],
  providers: [AuthService, AuthSessionService],
  exports: [AuthSessionService],
})
export class AuthModule {}
