import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto.js';
import { HashService } from '../hash/hash.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { JWT_EXPIRES_IN } from '../../constants/index.js';
import { getSafeUserUtil } from '../../utils/get-safe-user.util.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async create({ email, password, ...rest }: CreateDto) {
    const exists = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await this.hashService.hashPassword(password);
    const user = await this.prisma.users.create({
      data: {
        email,
        passwordHash,
        ...rest,
      },
    });
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
    });

    return {
      accessToken,
      expiresIn: JWT_EXPIRES_IN,
      user: getSafeUserUtil(user),
    };
  }
}
