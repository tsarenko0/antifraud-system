import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Genders, MaritalStatuses } from '../../../generated/prisma/enums.js';

export class UserUpdatableFieldsDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsEnum(Genders)
  @IsOptional()
  gender?: Genders;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsEnum(MaritalStatuses)
  @IsOptional()
  maritalStatus?: MaritalStatuses;
}
