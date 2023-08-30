// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
export default () => ({
  appEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_DRIVER as 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    db: process.env.DATABASE_DB,
  },
});
