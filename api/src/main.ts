import { NestFactory } from "@nestjs/core";
import { logger } from "./common/utilities/logger";
import { AppModule } from "./app.module";

async function start() {
  const PORT = Number(process.env.SERVER_PORT) || 5000;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => logger.info(`Server running. Port: ${PORT}`));
}

start();