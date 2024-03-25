import server from './src/server.js';

try {
  await server.start();
} catch (error) {
  console.error(error);
  process.exit(0);
}
