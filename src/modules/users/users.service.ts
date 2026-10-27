import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_NOT_FOUND_E, USERS_PAGE_LEN } from './users.constants.js';
import { isP2025 } from '../../utils/prisma-e-checkers/is-p2025.util.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { IUserIdentifier } from './interfaces/user-identifier.interface.js';
import { USER_EMAIL_EXISTS_E } from '../auth/auth.constants.js';
import { UserUpdatableFieldsDto } from './dto/user-updatable-fields.dto.js';
import { getSafeUserUtil } from '../../utils/get-safe-user.util.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(page: number = 0) {
    return this.prisma.users.findMany({
      skip: page * USERS_PAGE_LEN,
      take: USERS_PAGE_LEN,
      omit: {
        passwordHash: true,
      },
    });
  }

  async findOne(identifier: IUserIdentifier) {
    const user = await this.prisma.users.findUnique({
      where: identifier,
    });
    if (!user) return null;
    return getSafeUserUtil(user);
  }

  async create(data: CreateUserDto) {
    const exists = await this.prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (exists) throw new ConflictException(USER_EMAIL_EXISTS_E);
    return getSafeUserUtil(
      await this.prisma.users.create({
        data,
      }),
    );
  }

  async delete(identifier: IUserIdentifier) {
    try {
      const user = await this.prisma.users.delete({
        where: identifier,
      });
      if (!user) return null;
      return getSafeUserUtil(user);
    } catch (e) {
      if (isP2025(e)) throw new NotFoundException(USER_NOT_FOUND_E);
      throw e;
    }
  }

  async update(identifier: IUserIdentifier, data: UserUpdatableFieldsDto) {
    try {
      const user = await this.prisma.users.update({
        where: identifier,
        data,
      });
      if (!user) return null;
      return getSafeUserUtil(user);
    } catch (e) {
      if (isP2025(e)) throw new NotFoundException(USER_NOT_FOUND_E);
      throw e;
    }
  }
}
