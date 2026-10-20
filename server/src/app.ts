import cors from 'cors';
import express from 'express';
import { endpoints } from './endpoints/index.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/api', endpoints);

  return app;
}
