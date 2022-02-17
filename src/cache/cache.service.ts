import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  save<T>(key: string, payload: T, ttl: number) {
    this.cacheManager.set(key, payload, { ttl });
  }

  get<T>(key: string): Promise<T> {
    return this.cacheManager.get(key);
  }

  del(key: string) {
    return this.cacheManager.del(key);
  }
}
