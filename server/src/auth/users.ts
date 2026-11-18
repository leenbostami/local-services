import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createToken, hashPassword, verifyPassword } from './passwords.js';

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  cityId: string;
};

type StoredUser = PublicUser & {
  passwordHash: string;
  passwordSalt: string;
};

type Database = {
  users: StoredUser[];
  sessions: { token: string; userId: string }[];
};

const dataFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../data/users.json');

const emptyDatabase = (): Database => ({ users: [], sessions: [] });

async function readDatabase(): Promise<Database> {
  try {
    const raw = await readFile(dataFile, 'utf8');
    return JSON.parse(raw) as Database;
  } catch {
    return emptyDatabase();
  }
}

async function writeDatabase(database: Database) {
  await mkdir(path.dirname(dataFile), { recursive: true });
  await writeFile(dataFile, JSON.stringify(database, null, 2));
}

function publicUser(user: StoredUser): PublicUser {
  return { id: user.id, name: user.name, email: user.email, cityId: user.cityId };
}

export async function signUp(input: { name: string; email: string; password: string }) {
  const database = await readDatabase();
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  if (name.length < 2) {
    return { error: 'name' as const };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'email' as const };
  }

  if (input.password.length < 8) {
    return { error: 'password' as const };
  }

  if (database.users.some((user) => user.email === email)) {
    return { error: 'email_taken' as const };
  }

  const password = await hashPassword(input.password);
  const user: StoredUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    cityId: 'amman',
    passwordHash: password.hash,
    passwordSalt: password.salt,
  };
  const token = createToken();

  database.users.push(user);
  database.sessions.push({ token, userId: user.id });
  await writeDatabase(database);

  return { token, user: publicUser(user) };
}

export async function logIn(input: { email: string; password: string }) {
  const database = await readDatabase();
  const email = input.email.trim().toLowerCase();
  const user = database.users.find((item) => item.email === email);

  if (!user || !(await verifyPassword(input.password, user.passwordSalt, user.passwordHash))) {
    return { error: 'invalid' as const };
  }

  const token = createToken();
  database.sessions.push({ token, userId: user.id });
  await writeDatabase(database);

  return { token, user: publicUser(user) };
}

export async function userForToken(token: string) {
  const database = await readDatabase();
  const session = database.sessions.find((item) => item.token === token);
  const user = database.users.find((item) => item.id === session?.userId);

  return user ? publicUser(user) : null;
}
