import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly userName: string,
    public readonly password: string,
  ) {}
}
