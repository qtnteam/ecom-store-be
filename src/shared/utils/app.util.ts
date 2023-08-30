// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { AppConstant } from '@/constants/app.constant';

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
