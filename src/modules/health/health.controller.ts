import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Public } from '../auth/decorators/public.decorator.js';

@Controller('ping')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  async ping() {
    await this.prisma.$executeRaw`SELECT 1`;

    return { status: 'ok' };
  }
}
