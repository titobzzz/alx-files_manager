import { createClient } from 'redis';
import { promisify } from 'util';

// redis-check commands
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

   async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);
  }

  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
  }

  // set key
  async set(key, value, time) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value);
    await this.client.expire(key, time);
  }

 
}

const redisClient = new RedisClient();

module.exports = redisClient;
