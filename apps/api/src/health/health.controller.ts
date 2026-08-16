import { Controller, Get, UseGuards } from "@nestjs/common";
import { DemoAuthGuard } from "../common/demo-auth.guard.js";
import { PrismaService } from "../prisma/prisma.service.js";

@Controller("health")
@UseGuards(DemoAuthGuard)
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { database: "connected", status: "ok" };
  }
}
