import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module.js';
import { HashModule } from './modules/hash/hash.module.js';
import { CacheModule } from '@nestjs/cache-manager';
import { cacheConfig } from './configs/cache.config.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'antifraud-system',
    }),
    PrismaModule,
    HealthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    HashModule,
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: cacheConfig
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
