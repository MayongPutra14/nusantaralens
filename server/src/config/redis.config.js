import { createClient } from 'redis';

const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);
const redisClient = isProduction
  ? createClient({
      url: process.env.REDIS_URL,
    })
  : createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

redisClient.on('error', (err) => {
  console.error('Redis Error:', err);
});

await redisClient.connect();

export default redisClient;
