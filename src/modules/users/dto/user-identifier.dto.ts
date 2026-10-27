import { IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UserIdentifierDto {
  @ValidateIf((o) => o.id && !o.email)
  @IsOptional()
  @IsEmail()
  email?: string;

  @ValidateIf((o) => !o.id && o.email)
  @IsString()
  @IsOptional()
  id?: string;
}
