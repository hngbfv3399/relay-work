import { Body, Controller, Post } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { registerDemoUserSchema } from "@relay-work/contracts";
import { Public } from "../common/public.decorator.js";
import { parse } from "../common/zod.js";
import { PrismaService } from "../prisma/prisma.service.js";

@Controller("auth")
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Post("demo-users")
  async registerDemoUser(@Body() body: unknown) {
    const { name } = parse(registerDemoUserSchema, body);
    const user = await this.prisma.user.create({ data: { id: `user_${randomUUID()}`, name } });
    return { data: { user: { id: user.id, name: user.name }, demoUserId: user.id } };
  }
}
