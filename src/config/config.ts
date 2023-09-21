// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
export default () => ({
  appEnv: process.env.NODE_ENV,
  appUrl: process.env.APP_URL,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  tz: process.env.TZ || 'Asia/Ho_Chi_Minh',
  appTimeout: parseInt(process.env.APP_TIMEOUT, 10) || 30000,
  database: {
    type: process.env.DATABASE_DRIVER as 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    db: process.env.DATABASE_DB,
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
});
