import {
  PASSWORD_MAX_LEN,
  PASSWORD_MIN_LEN,
} from '../../auth/auth.constants.js';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Genders, MaritalStatuses } from '../../../generated/prisma/enums.js';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(PASSWORD_MIN_LEN)
  @MaxLength(PASSWORD_MAX_LEN)
  passwordHash: string;

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
