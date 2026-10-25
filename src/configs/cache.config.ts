import type { CacheOptions } from "@nestjs/cache-manager";
import type { ConfigService } from "@nestjs/config";
import { createKeyv } from '@keyv/redis';

export function cacheConfig(configService: ConfigService): CacheOptions {
  return {
    ttl: 60 * 60 * 24 * 7,
    stores: [createKeyv(configService.getOrThrow("REDIS_URL"))]
  }
}