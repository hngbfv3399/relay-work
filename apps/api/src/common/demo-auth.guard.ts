import { CanActivate, ExecutionContext, Injectable, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "../prisma/prisma.service.js";
import { ApiError } from "./api-error.js";
import { IS_PUBLIC_KEY } from "./public.decorator.js";

@Injectable()
export class DemoAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])) return true;
    const request = context.switchToHttp().getRequest();
    const userId = request.headers["x-demo-user-id"];
    if (typeof userId !== "string") {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "UNAUTHENTICATED", "x-demo-user-id 헤더가 필요합니다.");
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "INVALID_DEMO_USER", "존재하지 않는 데모 사용자입니다.");
    }
    request.currentUser = user;
    return true;
  }
}
