import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const derived = (await scrypt(password, salt, 64)) as Buffer;

  return { salt, hash: derived.toString('hex') };
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const actual = Buffer.from(derived.toString('hex'), 'hex');
  const expected = Buffer.from(expectedHash, 'hex');

  if (actual.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(actual, expected);
}

export function createToken() {
  return randomBytes(32).toString('hex');
}
