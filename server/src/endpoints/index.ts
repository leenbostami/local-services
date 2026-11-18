import { Router } from 'express';
import { authRouter } from './auth.js';
import { healthRouter } from './health.js';

export const endpoints = Router();

endpoints.use(healthRouter);
endpoints.use('/auth', authRouter);
