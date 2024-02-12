import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` });

import routes from './src/routes/routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

// Middleware configuration
app.use(express.json());

// Routes
app.use('/', routes);

// Run server
app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}`);
});

export default app;
