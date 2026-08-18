import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/http-exception.filter.js";
import { AppModule } from "./app.module.js";

function requiredEnv(name: "API_PORT" | "WEB_ORIGIN") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  return value;
}

async function bootstrap() {
  const port = Number(requiredEnv("API_PORT"));
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("API_PORT는 1~65535 범위의 포트 번호여야 합니다.");
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: requiredEnv("WEB_ORIGIN"),
  });
  await app.listen(port);
}

void bootstrap();
