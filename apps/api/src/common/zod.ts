import { HttpStatus } from "@nestjs/common";
import { z } from "zod";
import { ApiError } from "./api-error.js";

export function parse<T extends z.ZodTypeAny>(schema: T, value: unknown): z.infer<T> {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new ApiError(HttpStatus.BAD_REQUEST, "INVALID_REQUEST", result.error.issues[0]?.message ?? "요청 형식이 올바르지 않습니다.");
  }
  return result.data;
}
