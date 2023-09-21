import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { AsyncRequestContext } from './async-request-context/async-request-context.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppConstant } from './constants/app.constant';
import { BadRequestExceptionFilter } from './shared/filters/bad-request.filter';
import { EntityNotFoundExceptionFilter } from './shared/filters/entity-not-found.filter';
import { ForbiddenExceptionFilter } from './shared/filters/forbidden.filter';
import { InternalServerFilter } from './shared/filters/internal-server.filter';
import { UnauthorizedExceptionFilter } from './shared/filters/unauthorized.filter';
import { UnprocessableEntityExceptionFilter } from './shared/filters/unprocessable-entity.filter';
import { LoggerRequestGuard } from './shared/guards/logger-request.guard';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
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
    origin:
      config.get<string>('appEnv') === AppConstant.dev
        ? [config.get('appUrl'), 'https://localhost:3000']
        : config.get('appUrl'),
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  });

  // Set global prefix app
  app.setGlobalPrefix('api/v1');

  // Apply winston logger for app
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  const filterParam = {
    asyncRequestContext: app.get(AsyncRequestContext),
    logger,
  };

  app.useGlobalInterceptors(
    new ResponseInterceptor(filterParam),
    new TimeoutInterceptor(config),
  );

  // Config exception filter
  app.useGlobalFilters(
    new InternalServerFilter(filterParam),
    new BadRequestExceptionFilter(filterParam),
    new UnprocessableEntityExceptionFilter(filterParam),
    new UnauthorizedExceptionFilter(filterParam),
    new EntityNotFoundExceptionFilter(filterParam),
    new ForbiddenExceptionFilter(filterParam),
  );

  app.useGlobalGuards(
    new LoggerRequestGuard(filterParam),
    new JwtAuthGuard(app.get(Reflector)),
  );

  // Config swagger
  if (config.get('appEnv') === 'dev') {
    configSwagger(app);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  // Run app with port
  await app.listen(config.get('port'), '0.0.0.0');
}
bootstrap();
