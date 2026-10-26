import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import * as e from 'express';
import { REFRESH_TOKEN } from './auth.constants.js';
import { Public } from './decorators/public.decorator.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(
    @Body() data: RegisterDto,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    const { refreshToken, ...rest } = await this.authService.register(data);
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

  @Post('login')
  @Public()
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    const { refreshToken, ...rest } = await this.authService.login(dto);
    res.cookie(REFRESH_TOKEN, refreshToken);

    return rest;
  }

  @Post('logout')
  async logout(
    @Req() req: e.Request,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    res.clearCookie(REFRESH_TOKEN);
    return this.authService.logout(req.cookies[REFRESH_TOKEN]);
  }
}
