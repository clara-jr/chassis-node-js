import Redis from 'ioredis';

let redis;
const TTL = 60 * 60; // 1 h (60 * 60 s)

async function bootstrap(redis_uri) {
	let ready = false;

	redis = new Redis(redis_uri);

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
	return await redis.get(key);
}

async function del(key) {
	return await redis.del(key);
}


async function set(key, value) {
	return await redis.setex(key, TTL, JSON.stringify(value));
}

function disconnect() {
	redis.disconnect();
}

export default {
	bootstrap,
	get,
	set,
	del,
	disconnect
};
