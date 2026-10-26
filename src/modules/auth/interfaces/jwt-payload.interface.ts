import type { UserRoles } from '../../../generated/prisma/enums.js';

export interface IJwtPayload {
  sub: string;
  role: UserRoles;
  iat: number;
  exp: number;
}
