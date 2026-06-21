import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { logger } from "src/common/utilities/logger";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const start = Date.now();

        return next.handle().pipe(
            tap((data) => {
                const duration = Date.now() - start;

                logger.info(
                    `${request.method} ${request.url} (${response.statusCode}) - ${data.meta.context} (${duration}ms)`
                )
            })
        )
    }
}