import { Inject, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AdvancedConsoleLogger, LoggerOptions } from 'typeorm';

import { AsyncRequestContext } from '@/async-request-context/async-request-context.service';
import { AppConstant } from '@/constants/app.constant';
import { LoggerConstant } from '@/constants/logger.constant';

import { replaceHiddenText } from '../utils/app.util';

export class QueryLogger extends AdvancedConsoleLogger {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    private readonly asyncRequestContext: AsyncRequestContext,
  ) {
    super(LoggerConstant.queryLogLevels as LoggerOptions);
  }

  logQuery(query: string, parameters?: any[]): void {
    const stringifyParams =
      parameters && parameters.length
        ? LoggerConstant.parameterPrefix +
          JSON.stringify(this.buildLogParameters(query, [...parameters]))
        : '';

    const sql = LoggerConstant.queryPrefix + query + stringifyParams;

    this.logger.log(
      sql,
      this.asyncRequestContext.getRequestIdStore() ||
        LoggerConstant.typeOrmFirstQuery,
    );
  }

  private buildLogParameters(query: string, parameters?: any[]) {
    return this[
      query.startsWith(LoggerConstant.startQueryInsert)
        ? 'buildHiddenParamInert'
        : 'buildHiddenParamCommon'
    ](query, [...parameters]);
  }

  private buildHiddenParamInert(query: string, parameters?: any[]) {
    const regExp = /\(([^)]+)\)/;
    const matchInsert = regExp.exec(query);
    // Get field insert - remove space and convert to array
    const fieldInsert = matchInsert[1].replace(/\`/g, '').split(', ');
    // get values insert
    const regexValues = /VALUES \(([^)]+)\)/;
    const matchValue = regexValues.exec(query);
    const values = matchValue[1].replace(/\`/g, '').split(', ');
    const filtered = fieldInsert.filter(
      (_, index) => !this.getAllKeyDefault(values).includes(index),
    );

    return this.replaceHiddenText(filtered, [...parameters]);
  }

  private buildHiddenParamCommon(query: string, parameters?: any[]) {
    const regex = /`([^`]+)`\s*=\s*\?/g;
    const matches = [...query.matchAll(regex)];
    const filtered = matches
      .map((match) => match[1].trim())
      .filter((_, index) => parameters[index] !== undefined);

    return this.replaceHiddenText(filtered, [...parameters]);
  }

  private getAllKeyDefault(array: string[]): number[] {
    const defaultValue = 'DEFAULT';

    return array.reduce((keys, item, index) => {
      if (item === defaultValue) {
        keys.push(index);
      }
      return keys;
    }, []);
  }

  private replaceHiddenText(fields: string[], parameters: string[]): string[] {
    fields.forEach((item, index) => {
      if (AppConstant.blackListField.includes(item)) {
        parameters[index] &&
          (parameters[index] = replaceHiddenText(parameters[index]));
      }
    });

    return parameters;
  }
}
