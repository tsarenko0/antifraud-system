import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto.js';
import { HashService } from '../hash/hash.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { JWT_EXPIRES_IN } from '../../constants/index.js';
import { getSafeUserUtil } from '../../utils/get-safe-user.util.js';
import { CACHE_MANAGER, Cache as CacheService } from '@nestjs/cache-manager';
import { randomUUID } from 'node:crypto';
import type { ITokens } from './interfaces/tokens.interface.js';
import type { Users } from '../../generated/prisma/client.js';
import {
  getRefreshCacheKey,
  REFRESH_NOT_FOUND_E,
  USER_EMAIL_EXISTS_E,
  REFRESH_USER_NOT_EXISTS_E,
  USER_REFRESH_NOT_FOUND_E,
} from './auth.constants.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheService: CacheService,
  ) {}
  async create({ email, password, ...rest }: CreateDto) {
    const exists = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      throw new ConflictException(USER_EMAIL_EXISTS_E);
    }

    const passwordHash = await this.hashService.hashPassword(password);
    const user = await this.prisma.users.create({
      data: {
        email,
        passwordHash,
        ...rest,
      },
    });
    const tokens = await this.issueTokens(user);

    return {
      ...tokens,
      user: getSafeUserUtil(user),
    };
  }

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) throw new NotFoundException(REFRESH_NOT_FOUND_E);

    const refreshHash = this.hashService.hashRefresh(refreshToken);
    const userId = await this.cacheService.get<string>(
      getRefreshCacheKey(refreshHash),
    );

    if (!userId) throw new UnauthorizedException(USER_REFRESH_NOT_FOUND_E);
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new UnauthorizedException(REFRESH_USER_NOT_EXISTS_E);

    return this.issueTokens(user);
  }

  private async issueTokens(user: Users): Promise<ITokens> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
    });
    const refreshToken = randomUUID();
    const refreshHash = this.hashService.hashRefresh(refreshToken);

    await this.cacheService.set(
      getRefreshCacheKey(refreshHash),
      user.id,
      1000 * 60 * 60 * 24 * 7,
    );

    return { accessToken, refreshToken, expiresIn: JWT_EXPIRES_IN };
  }
}
