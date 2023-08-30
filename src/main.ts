// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { configSwagger } from './shared/utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Get config of app.
  const config = app.get<ConfigService>(ConfigService);

  // Config swagger
  if (config.get('appEnv') === 'dev') {
    await configSwagger(app);
  }

  // CORS
  // TODO fix origin config get from env
  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  });

  // Run app with port
  await app.listen(config.get('port'), '0.0.0.0');
}
bootstrap();
