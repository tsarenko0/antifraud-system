import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_MAX_LEN, PASSWORD_MIN_LEN } from '../auth.constants.js';

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LEN)
  @MaxLength(PASSWORD_MAX_LEN)
  password: string;
}
