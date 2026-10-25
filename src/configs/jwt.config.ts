import { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_EXPIRES_IN } from '../constants/index.js';

export function jwtConfig(configService: ConfigService): JwtModuleOptions {
  const jwt_secret = configService.getOrThrow('JWT_SECRET');
  console.log(jwt_secret);
  return {
    secret: jwt_secret,
    signOptions: {
      expiresIn: JWT_EXPIRES_IN,
    },
  };
}
