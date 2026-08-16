import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module.js";
import { DemoAuthGuard } from "./common/demo-auth.guard.js";
import { HealthModule } from "./health/health.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";
import { RelayModule } from "./relay/relay.module.js";

@Module({
  imports: [PrismaModule, HealthModule, RelayModule, AuthModule],
  providers: [{ provide: APP_GUARD, useClass: DemoAuthGuard }],
})
export class AppModule {}
