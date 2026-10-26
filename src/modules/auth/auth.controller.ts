import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateDto } from './dto/create.dto.js';
import * as e from 'express';
import { REFRESH_TOKEN } from './auth.constants.js';
import { Public } from './decorators/public.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async create(
    @Body() data: CreateDto,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    const { refreshToken, ...rest } = await this.authService.create(data);
    res.cookie(REFRESH_TOKEN, refreshToken);

    return rest;
  }

  @Get('refresh')
  @Public()
  async refresh(
    @Req() req: e.Request,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    const refreshTokenFromCookie: string = req?.cookies[REFRESH_TOKEN];
    const { refreshToken, ...rest } = await this.authService.refresh(
      refreshTokenFromCookie,
    );

    res.cookie(REFRESH_TOKEN, refreshToken);
    return rest;
  }
}
