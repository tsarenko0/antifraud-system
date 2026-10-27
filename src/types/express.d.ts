import { IJwtPayload } from '../modules/auth/interfaces/jwt-payload.interface.js';

declare global {
  namespace Express {
    interface Request {
      user: IJwtPayload;
    }
  }
}

export {};
