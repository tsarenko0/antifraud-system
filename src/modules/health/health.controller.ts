import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('ping')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async ping() {
    await this.prisma.$executeRaw`SELECT 1`

    return {status: "ok"}
  }
}
