export const IS_PUBLIC = 'isPublic';

export const AppConstant = {
  dev: 'dev',
  test: 'test',
  prod: 'production',
  stg: 'staging',
  blackListField: ['username', 'email', 'password'],
  numDigitsHidden: 6,
  characterHidden: '*',
  maxCharacterLog: 200,
  saltOrRounds: 10,
};

export const JwtConstant = {
  JwtExpiresIn: '3d',
  JwtRefreshExpiresIn: '30d',
};
