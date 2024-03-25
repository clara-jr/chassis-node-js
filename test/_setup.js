import server from '../src/server.js';

before(async () => {
  console.info('🤖 Launching server before running tests...');
  try {
    await server.start();
  } catch (error) {
    console.error(error);
  }
});

after(async () => {
  console.info('🤖 Stopping server after running tests...');
  try {
    await server.stop();
  } catch (error) {
    console.error(error);
  }
});