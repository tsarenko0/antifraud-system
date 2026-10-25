import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  hashPassword(raw: string) {
    return argon2.hash(raw);
  }

  hashRefresh(raw: string) {
    return argon2.hash(raw);
  }

  verifyPassword(raw: string, hash: string) {
    return argon2.verify(hash, raw);
  }
}
