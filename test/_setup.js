import server from '../src/server.js';

try {
	await server.start();
} catch (error) {
	console.log(error);
	process.exit(0);
}