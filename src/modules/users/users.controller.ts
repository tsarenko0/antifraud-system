import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CurrentUser } from '../../decorators/current-user.decorator.js';
import type { IJwtPayload } from '../auth/interfaces/jwt-payload.interface.js';
import { IsAdminGuard } from '../auth/guards/is-admin.guard.js';
import { UserUpdatableFieldsDto } from './dto/user-updatable-fields.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(IsAdminGuard)
  findMany(@Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number) {
    return this.usersService.findMany(page);
  }

  @Get('me')
  findMe(@CurrentUser() { sub }: IJwtPayload) {
    return this.usersService.findOne({ id: sub });
  }

  @Patch('me')
  updateMe(
    @Body() data: UserUpdatableFieldsDto,
    @CurrentUser() { sub }: IJwtPayload,
  ) {
    return this.usersService.update({ id: sub }, data);
  }

  @Delete('me')
  deleteMe(@CurrentUser() { sub }: IJwtPayload) {
    return this.usersService.delete({ id: sub });
  }

  @Get(':id')
  @UseGuards(IsAdminGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  delete(@Param('id') id: string) {
    return this.usersService.delete({ id });
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  update(@Param('id') id: string, @Body() data: UserUpdatableFieldsDto) {
    return this.usersService.update({ id }, data);
  }
}
