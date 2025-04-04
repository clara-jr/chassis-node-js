let IMDBService;
const TTL = 60; // 1 min (60 s)

async function bootstrap(service, config) {
  IMDBService = service;
  await IMDBService.bootstrap(config);
}

async function get(key) {
  return IMDBService.get(key);
}

async function del(key) {
  return IMDBService.del(key);
}


async function setex(key, value, ttl = TTL) {
  return IMDBService.setex(key, JSON.stringify(value), ttl);
}

function disconnect() {
  IMDBService.disconnect();
}

export default {
  bootstrap,
  get,
  setex,
  del,
  disconnect
};
