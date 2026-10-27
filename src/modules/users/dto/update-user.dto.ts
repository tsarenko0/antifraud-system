import { UserUpdatableFieldsDto } from './user-updatable-fields.dto.js';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserIdentifierDto } from './user-identifier.dto.js';
import type { IUserIdentifier } from '../interfaces/user-identifier.interface.js';

export class UpdateUserDto {
  @ValidateNested()
  @Type(() => UserUpdatableFieldsDto)
  fields: UserUpdatableFieldsDto;

  @ValidateNested()
  @Type(() => UserIdentifierDto)
  identifier: IUserIdentifier;
}
