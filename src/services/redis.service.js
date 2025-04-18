import Redis from 'ioredis';

let redis;

async function bootstrap({ uri }) {
  let ready = false;

  redis = new Redis(uri);

  redis.on('ready', () => {
    ready = true;
  });

  redis.on('error', (error) => {
    console.error(error);
  });

  // Wait until redis is ready so the connection is not used before it is established
  let wait = 30;
  while (!ready) {
    await _sleep(1000);
    if (--wait < 1) {
      throw new Error('Redis is not connecting (waited for 30 seconds)');
    }
  }
}

function _sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function get(key) {
  return redis.get(key);
}

async function del(key) {
  return redis.del(key);
}


async function setex(key, value, ttl) {
  return redis.setex(key, ttl, value);
}

function disconnect() {
  redis.disconnect();
}

export default {
  bootstrap,
  get,
  setex,
  del,
  disconnect
};
