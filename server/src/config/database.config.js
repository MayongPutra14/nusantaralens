import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';
console.log(`Using Environmnet:  ${process.env.NODE_ENV}`);
export const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        port: process.env.PG_PORT,
      },
);

export default pool;
