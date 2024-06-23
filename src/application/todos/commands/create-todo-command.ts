import { ICommand } from '@nestjs/cqrs';
import { CreateTodoItemDto } from '../../../shared/dtos/todo-item.dto';

export class CreateTodoCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly user: string,
    public readonly todoItems: CreateTodoItemDto[],
  ) {}
}
