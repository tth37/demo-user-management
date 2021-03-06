import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AuthMiddleware } from "./auth/auth.middleware";
import { CustomCacheModule } from "./cache/cache.module";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 2345,
      username: "postgres",
      password: "password",
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CustomCacheModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
