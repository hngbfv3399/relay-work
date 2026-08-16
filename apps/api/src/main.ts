import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/http-exception.filter.js";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: process.env["WEB_ORIGIN"] ?? "http://localhost:3000",
  });
  await app.listen(process.env["API_PORT"] ?? 4000);
}

void bootstrap();
