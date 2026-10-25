import type { Users } from '../generated/prisma/client.js';

export function getSafeUserUtil(user: Users) {
  const { passwordHash, ...rest } = user;
  return rest;
}
