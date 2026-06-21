import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { logger } from "./common/utilities/logger";
import { ValidationPipe } from "./pipes/validation.pipe";
import { HttpExceptionFilter } from "./filters/exception.filter";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = Number(process.env.SERVER_PORT) || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Проектная работа по архитектуре Backend приложения')
    .setDescription('Документация к приложению')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, () => logger.info(`Server running. Port: ${PORT}`));
}

start();