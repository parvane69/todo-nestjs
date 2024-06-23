import { ICommand } from '@nestjs/cqrs';

export class CreateTodoItemCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly priority: number,
    public readonly user: string,
    public readonly todo: string,
  ) {}
}
