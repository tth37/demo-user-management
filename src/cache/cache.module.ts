import { CacheModule, Module } from "@nestjs/common";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { CacheService } from "./cache.service";
import { ConfigModule } from "src/config/config.module";

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: "localhost",
        port: 6379,
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CustomCacheModule {}
