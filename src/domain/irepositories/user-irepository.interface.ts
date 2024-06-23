import {
  UserOutputDto,
  UserRegistrationInputDto,
  UserRegistrationOutputDto,
} from '../../shared/dtos/users.dto';

export interface UserIRepository {
  findUser(userName: string): Promise<UserOutputDto>;
  createUser(dto: UserRegistrationInputDto): Promise<UserRegistrationOutputDto>;
}
