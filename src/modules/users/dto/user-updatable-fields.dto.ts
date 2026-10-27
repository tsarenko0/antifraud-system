import { IsEnum, IsInt, IsString } from 'class-validator';
import { Genders, MaritalStatuses } from '../../../generated/prisma/enums.js';

export class UserUpdatableFieldsDto {
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
