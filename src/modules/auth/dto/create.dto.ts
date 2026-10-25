import { Genders, MaritalStatuses } from '../../../generated/prisma/enums.js';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
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
