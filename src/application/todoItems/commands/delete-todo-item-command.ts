import { ICommand } from '@nestjs/cqrs';

export class DeleteTodoItemCommand implements ICommand {
  constructor(
    public readonly user: string,
    public readonly todo: string,
    public readonly todoItem: string,
  ) {}
}
