// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ExceptionFilterType } from '../common/type';
import { buildLogParameters, createStore } from '../utils/app.util';

@Injectable()
export class LoggerRequestGuard implements CanActivate {
  constructor(private readonly filterParam: ExceptionFilterType) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let { logger, asyncRequestContext } = this.filterParam;
    let req = context.switchToHttp().getRequest();

    const logContext = createStore(req, asyncRequestContext);

    logger.log(
      `[Params]: ${JSON.stringify(
        buildLogParameters(Object.assign({}, req.body || req.query)),
      )}`,
      logContext,
    );

    logger = asyncRequestContext = req = null;

    return true;
  }
}
