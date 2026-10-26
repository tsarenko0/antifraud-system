import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HashModule } from '../hash/hash.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfig } from '../../configs/jwt.config.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  imports: [
    PrismaModule,
    HashModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
  ],
})
export class AuthModule {}
