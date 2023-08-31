// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

import { AppConstant } from '@/constants/app.constant';

import { loggerFormat } from './logger.format';
import { QueryLogger } from './query.logger';

const formatted = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
};

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transports: [
          new transports.Console({
            silent: configService.get('appEnv') === AppConstant.test,
            format: format.combine(
              format.timestamp({ format: formatted }),
              loggerFormat(),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [QueryLogger],
  exports: [QueryLogger],
})
export class LoggerModule {}
