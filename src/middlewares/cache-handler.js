import RedisService from '../services/redis.service.js';

export default async function (req, res, next) {
	// only cache GET requests
	if (req.method !== 'GET') return next();

	const key = `chassis-node-js-${req.jwtUser.userName}-${req.originalUrl}`;
	
	// Get data from cache
	try {
		let cachedData = await RedisService.get(key);
		if (cachedData) {
			cachedData = JSON.parse(cachedData);
			return res.status(cachedData.status || 200).json(cachedData);
		}
	} catch (error) {
		console.info('⚠️ Error getting data from cache');
		console.error(error);
	}

	// Re-generate data and cache it
	const send = res.send;
	res.send = (body) => {
		try {
			const data = JSON.parse(body);
			RedisService.set(key, data);
		} catch (error) {
			console.info('⚠️ Error parsing or caching data');
			console.error(error);
		}
		send.call(res, body);
	};
  
	next();
}