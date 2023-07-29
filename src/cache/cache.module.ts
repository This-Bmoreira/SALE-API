import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 9999,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheManager {}
