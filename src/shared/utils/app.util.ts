// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import * as isEmpty from 'lodash/isEmpty';
import { v4 } from 'uuid';

import { AsyncRequestContext } from '@/async-request-context/async-request-context.service';
import { AppConstant } from '@/constants/app.constant';

import { ObjectType, StoreContextType } from '../common/type';

export const replaceHiddenText = (
  text: string,
  numDigitsHidden = AppConstant.numDigitsHidden,
  characterHidden = AppConstant.characterHidden,
) => {
  const textReplaced = `${text}`.replace(
    // example : example => exam***
    new RegExp(`.{0,${numDigitsHidden}}$`),
    `${characterHidden.repeat(numDigitsHidden)}`,
  );

  if (
    typeof textReplaced === 'string' &&
    textReplaced.length >= AppConstant.maxCharacterLog
  ) {
    return (
      textReplaced.substring(0, AppConstant.maxCharacterLog) +
      `${characterHidden.repeat(numDigitsHidden)}...`
    );
  }

  return textReplaced;
};

export const createStore = (
  req: any,
  asyncRequestContext: AsyncRequestContext,
): StoreContextType => {
  let store = asyncRequestContext.getRequestIdStore();

  if (isEmpty(store)) {
    const requestId = v4();

    const logContext: StoreContextType = {
      contextId: requestId,
      ip: req.headers['x-forwarded-for'] || req.ip,
      endpoint: req.raw?.url || req.originalUrl,
      device: req.headers['user-agent'],
      domain: req.hostname,
      userId: req.user?.id,
      method: req.method,
    };

    asyncRequestContext.set(logContext);
    store = logContext;
  }

  return store;
};

export const buildLogParameters = (params: ObjectType): ObjectType => {
  AppConstant.blackListField.forEach((item) => {
    if (params[item]) {
      params[item] = replaceHiddenText(params[item]);
    }
  });

  return params;
};
