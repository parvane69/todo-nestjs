import { MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'typeorm';
import { Types } from 'mongoose';
import { IsOptionalWithApi } from '../../base/decorator/dto.validator.decorator';
import { Mapped } from '../../base/utils/mapper/mapper.decorator';
import { MappedWithEntity } from '../../base/utils/mapper/mapper.types';
import { User } from '../../domain/schemas/users.schema';

export class UserFullNameOutputDto implements MappedWithEntity<User> {
  @Mapped() id: number;
  @Mapped() userName?: string;
  @Mapped() password?: string;
}
export class UserOutputDto {
  @Mapped() id: Types.ObjectId;
  @Mapped() password: string;
}
export class UserRegistrationOutputDto {
  @Mapped() _id: ObjectId;
}
export class UserRegistrationInputDto {
  @MinLength(3)
  @MaxLength(25)
  userName: string;

  @MinLength(6)
  @MaxLength(25)
  password: string;
}
export class UserLoginInputDto {
  @MinLength(3)
  @MaxLength(25)
  @IsOptionalWithApi()
  userName: string;

  @MinLength(6)
  @MaxLength(25)
  @IsOptionalWithApi()
  password: string;
}
export class UserLoginOutputDto {
  @Mapped() token: string;
  @Mapped() message: string;
}
