// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Get config of app.
  const config = app.get<ConfigService>(ConfigService);

  // Run app with port
  await app.listen(config.get('port'), '0.0.0.0');
}
bootstrap();
