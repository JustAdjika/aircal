import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { logger } from "src/common/utilities/logger";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const request = ctx.getRequest();
        const response = ctx.getResponse();

        let message = `Internal server error`
        let status = HttpStatus.INTERNAL_SERVER_ERROR

        if(exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else if(exception instanceof Error) {
            message = exception.message;
        }

        const logMsg = `${request.method} ${request.url} (${status}) - ${message}`;

        if(status >= 500) logger.error(logMsg)
        else logger.warn(logMsg);

        response.status(status).json({
            statusCode: status,
            message
        })
    }
}