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
import { Users } from '../../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(page: number = 0) {
    return this.prisma.users.findMany({
      skip: page * USERS_PAGE_LEN,
      take: USERS_PAGE_LEN,
    });
  }

  findOne(identifier: IUserIdentifier) {
    return this.prisma.users.findUnique({
      where: identifier,
    });
  }

  async create(data: CreateUserDto) {
    const exists = await this.prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (exists) throw new ConflictException(USER_EMAIL_EXISTS_E);
    return this.prisma.users.create({
      data,
    });
  }

  delete(identifier: IUserIdentifier) {
    try {
      return this.prisma.users.delete({
        where: identifier,
      });
    } catch (e) {
      if (isP2025(e)) throw new NotFoundException(USER_NOT_FOUND_E);
      throw e;
    }
  }

  update(
    identifier: IUserIdentifier,
    data: UserUpdatableFieldsDto,
  ): Promise<Users> {
    try {
      return this.prisma.users.update({
        where: identifier,
        data,
      });
    } catch (e) {
      if (isP2025(e)) throw new NotFoundException(USER_NOT_FOUND_E);
      throw e;
    }
  }
}
