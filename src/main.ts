// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './shared/filters/bad-request.filter';
import { EntityNotFoundExceptionFilter } from './shared/filters/entity-not-found.filter';
import { ForbiddenExceptionFilter } from './shared/filters/forbidden.filter';
import { InternalServerFilter } from './shared/filters/internal-server.filter';
import { UnauthorizedExceptionFilter } from './shared/filters/unauthorized.filter';
import { UnprocessableEntityExceptionFilter } from './shared/filters/unprocessable-entity.filter';
import { configSwagger } from './shared/utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Get config of app.
  const config = app.get<ConfigService>(ConfigService);

  // CORS
  // TODO fix origin config get from env
  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  });

  // Set global prefix app
  app.setGlobalPrefix('api/v1');

  // Apply winston logger for app
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // Config exception filter
  app.useGlobalFilters(
    new BadRequestExceptionFilter(logger),
    new EntityNotFoundExceptionFilter(logger),
    new ForbiddenExceptionFilter(logger),
    new InternalServerFilter(logger),
    new UnauthorizedExceptionFilter(logger),
    new UnprocessableEntityExceptionFilter(logger),
  );

  // Config swagger
  if (config.get('appEnv') === 'dev') {
    configSwagger(app);
  }

  // Run app with port
  await app.listen(config.get('port'), '0.0.0.0');
}
bootstrap();
