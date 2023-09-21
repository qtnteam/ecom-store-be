import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

import { AsyncRequestContext } from '@/async-request-context/async-request-context.service';
import { AppConstant } from '@/constants/app.constant';

import { loggerFormat } from './logger.format';
import { QueryLogger } from './query.logger';

const formatted = (timeZone: string) => {
  return new Date().toLocaleString('en-US', {
    timeZone,
  });
};

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService,
        asyncContext: AsyncRequestContext,
      ) => ({
        transports: [
          new transports.Console({
            silent: configService.get('appEnv') === AppConstant.test,
            format: format.combine(
              format.timestamp({ format: formatted(configService.get('tz')) }),
              loggerFormat(asyncContext),
            ),
          }),
        ],
      }),
      inject: [ConfigService, AsyncRequestContext],
    }),
  ],
  providers: [QueryLogger],
  exports: [QueryLogger],
})
export class LoggerModule {}
