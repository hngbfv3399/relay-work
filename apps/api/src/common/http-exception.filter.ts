import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = exception instanceof HttpException ? exception.getResponse() : null;
    if (typeof payload === "object" && payload && "error" in payload) return response.status(status).json(payload);
    const message = typeof payload === "object" && payload && "message" in payload ? String((payload as { message: unknown }).message) : "서버 오류가 발생했습니다.";
    return response.status(status).json({ error: { code: status === 500 ? "INTERNAL_ERROR" : "REQUEST_FAILED", message } });
  }
}
