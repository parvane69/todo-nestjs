import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user-query';
import { UsersRepository } from '../../../infrastructure/repositories/user-repository';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private userRepository: UsersRepository) {}

  async execute(query: GetUserQuery) {
    const { userName } = query;
    const user = await this.userRepository.findUser(userName);
    return user;
  }
}
