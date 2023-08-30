// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { green, red, white, yellow } from 'cli-color';
import { PlatformTools } from 'typeorm/platform/PlatformTools';
import { format } from 'winston';

import { AppConstant } from '@/constants/app.constant';
import { LoggerConstant } from '@/constants/logger.constant';

export const loggerFormat = () =>
  format.printf(({ level, message, timestamp }) => {
    let colorFunction;

    switch (level) {
      case LoggerConstant.infoLevel:
        colorFunction = green;
        break;
      case LoggerConstant.errorLevel:
        colorFunction = red;
        break;
      case LoggerConstant.warnLevel:
        colorFunction = yellow;
        break;
      default:
        colorFunction = white;
        break;
    }

    if (![AppConstant.dev, AppConstant.test].includes(process.env.NODE_ENV)) {
      colorFunction = (text: string) => text;
    }

    // TODO config with contextId, ip, device, domain, userId, endpoint later
    level = colorFunction(`[${level.toUpperCase()}]`);

    if (
      LoggerConstant.infoLevel === level &&
      message.startsWith(LoggerConstant.queryPrefix)
    ) {
      message = PlatformTools.highlightSql(message);
    }

    return `${timestamp} ${level} - ${message}`;
  });
