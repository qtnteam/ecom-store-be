import { green, red, white, yellow } from 'cli-color';
import { PlatformTools } from 'typeorm/platform/PlatformTools';
import { format } from 'winston';

import { AsyncRequestContext } from '@/async-request-context/async-request-context.service';
import { AppConstant } from '@/constants/app.constant';
import { LoggerConstant } from '@/constants/logger.constant';

export const loggerFormat = (asyncContext: AsyncRequestContext) =>
  format.printf(({ context, level, message, timestamp }) => {
    let { contextId, endpoint, ip, device, domain, userId, method } =
      context || asyncContext.getRequestIdStore() || {};

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

    level = colorFunction(`[${level.toUpperCase()}]`);
    domain = colorFunction(`[${domain}]`);
    userId = colorFunction(`[LoginID: ${userId}]`);
    ip = colorFunction(`[IP: ${ip}]`);
    endpoint = colorFunction(`[Endpoint: ${endpoint}]`);
    device = colorFunction(`[Device: ${device}]`);
    method = colorFunction(`[${method}]`);
    contextId = colorFunction(`[${contextId}]`);

    if (
      LoggerConstant.infoLevel === level &&
      message.startsWith(LoggerConstant.queryPrefix)
    ) {
      message = PlatformTools.highlightSql(message);
    }

    return `${timestamp} ${contextId} ${level} ${domain} ${userId} ${ip} ${method} ${endpoint} ${device} - ${message}`;
  });
