import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import routes from './routes/routes.js';
import customErrorHandler from './middlewares/custom-error-handler.js';
import cacheHandler from './middlewares/cache-handler.js';
import authenticationHandler from './middlewares/authentication-handler.js';
import RedisService from './services/redis.service.js';
import JWTService from './services/jwt.service.js';

const app = express();
const PORT = process.env.PORT || 8080;

let server;

async function start() {
  dotenv.config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` });
  console.info(`NODE_ENV: ${process.env.NODE_ENV}`);

  // Init app services (e.g. MongoDB connection)
  await mongoose.connect(process.env.MONGODB_URI);
  console.info(`✅ MongoDB is connected to ${process.env.MONGODB_URI}`);
  await RedisService.bootstrap(process.env.REDIS_URI);
  console.info(`✅ Redis is connected to ${process.env.REDIS_URI}`);
  JWTService.bootstrap();

  // Add middlewares (including routes)
  app.use(helmet()); // set HTTP response headers
  app.use(express.json()); // for parsing application/json
  app.use(cors()); // enable CORS
  app.use(cookieParser()); // set req.cookies
  app.use(authenticationHandler);
  app.use(cacheHandler);
  app.use('/', routes);
  app.use(customErrorHandler);

  // Start Express server
  await new Promise((resolve) => {
    server = app.listen(PORT, () => {
      console.info(`✅ Express server listening at port: ${PORT}`);
      resolve(true);
    });
  });
}

async function stop() {
  // Stop Express server
  await new Promise((resolve) => {
    if (server) {
      server.close(() => {
        console.info('Express server stopped');
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });

  // Stop app services (e.g. MongoDB connection)
  await mongoose.disconnect();
  console.info('MongoDB disconnected');
  RedisService.disconnect();
  console.info('Redis disconnected');

  console.info('Exiting...');
}

// Docker stop
process.on('SIGTERM', async () => {
  await stop();
  process.exit(0);
});

// Cctrl-C
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
