import { Prisma } from '../../generated/prisma/client.js';

export function isP2025(e: unknown) {
  return (
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025'
  );
}
