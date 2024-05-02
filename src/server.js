import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { styleText } from 'node:util';

import routes from './routes/routes.js';
import customErrorHandler from './middlewares/custom-error-handler.js';
import cacheHandler from './middlewares/cache-handler.js';
import authenticationHandler from './middlewares/authentication-handler.js';
import setOpenAPIDocumentation from './middlewares/openapi-docs-handler.js';
import setMorganLogger from './middlewares/morgan-logger-handler.js';
import RedisService from './services/redis.service.js';
import JWTService from './services/jwt.service.js';

const app = express();
const PORT = process.env.PORT || 8080;

let server;

async function start() {
  process.loadEnvFile(`.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`);
  console.info(styleText('bold', `NODE_ENV: ${styleText(['bgGreenBright', 'bold'], process.env.NODE_ENV)}`));

  // Init app services (e.g. MongoDB connection)
  await mongoose.connect(process.env.MONGODB_URI);
  console.info(`✅ MongoDB is connected to ${styleText(['bgGreenBright', 'bold'], process.env.MONGODB_URI)}`);
  await RedisService.bootstrap(process.env.REDIS_URI);
  console.info(`✅ Redis is connected to ${styleText(['bgGreenBright', 'bold'], process.env.REDIS_URI)}`);
  JWTService.bootstrap();

  // Add middlewares (including routes)
  app.use(helmet()); // set HTTP response headers
  app.use(express.json()); // for parsing application/json
  app.use(cors()); // enable CORS
  app.use(cookieParser()); // set req.cookies
  setMorganLogger(app); // set morgan logger
  setOpenAPIDocumentation(app); // set openapi documentation
  app.use(authenticationHandler);
  app.use(cacheHandler);
  app.use('/', routes);
  app.use(customErrorHandler);

  // Start Express server
  await new Promise((resolve) => {
    server = app.listen(PORT, () => {
      console.info(`✅ Express server listening at port: ${styleText(['bgGreenBright', 'bold'], `${PORT}`)}`);
      resolve(true);
    });
  });
}

async function stop() {
  // Stop Express server
  await new Promise((resolve) => {
    if (server) {
      server.close(() => {
        console.info(styleText('dim', 'Express server stopped'));
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });

  // Stop app services (e.g. MongoDB connection)
  await mongoose.disconnect();
  console.info(styleText('dim', 'MongoDB disconnected'));
  RedisService.disconnect();
  console.info(styleText('dim', 'Redis disconnected'));

  console.info(styleText('dim', 'Exiting...'));
}

// Docker stop
process.on('SIGTERM', async () => {
  await stop();
  process.exit(0);
});

// Ctrl-C
process.on('SIGINT', async () => {
  await stop();
  process.exit(0);
});

// Nodemon restart
process.on('SIGUSR2', async () => {
  await stop();
  process.exit(0);
});

export default { app, start, stop };
