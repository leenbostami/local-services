import { Router } from 'express';

import { logIn, signUp, userForToken } from '../auth/users.js';

export const authRouter = Router();

function readFields(body: unknown) {
  if (!body || typeof body !== 'object') {
    return { name: '', email: '', password: '' };
  }

  const record = body as Record<string, unknown>;

  return {
    name: typeof record.name === 'string' ? record.name : '',
    email: typeof record.email === 'string' ? record.email : '',
    password: typeof record.password === 'string' ? record.password : '',
  };
}

authRouter.post('/signup', async (request, response) => {
  const result = await signUp(readFields(request.body));

  if ('error' in result) {
    const status = result.error === 'email_taken' ? 409 : 400;
    response.status(status).json({ error: result.error });
    return;
  }

  response.status(201).json(result);
});

authRouter.post('/login', async (request, response) => {
  const result = await logIn(readFields(request.body));

  if ('error' in result) {
    response.status(401).json({ error: result.error });
    return;
  }

  response.json(result);
});

authRouter.get('/me', async (request, response) => {
  const header = request.header('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  const user = token ? await userForToken(token) : null;

  if (!user) {
    response.status(401).json({ error: 'invalid' });
    return;
  }

  response.json({ user });
});
