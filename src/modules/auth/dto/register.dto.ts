import { Genders, MaritalStatuses } from '../../../generated/prisma/enums.js';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PASSWORD_MAX_LEN, PASSWORD_MIN_LEN } from '../auth.constants.js';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LEN)
  @MaxLength(PASSWORD_MAX_LEN)
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  region: string;

  @IsEnum(Genders)
  gender: Genders;

  @IsInt()
  age: number;

  @IsEnum(MaritalStatuses)
  maritalStatus: MaritalStatuses;
}
