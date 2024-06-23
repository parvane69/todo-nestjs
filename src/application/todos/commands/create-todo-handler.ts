import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../../infrastructure/repositories/todo-repository';
import { CreateTodoCommand } from './create-todo-command';
import { TodoItemRepository } from '../../../infrastructure/repositories/todo-item-repository';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    private todoRepository: TodoRepository,
    private todoItemRepository: TodoItemRepository,
  ) {}

  async execute(command: CreateTodoCommand) {
    const todoItemsIds = await this.todoItemRepository.createTodoItems(
      command.todoItems,
    );

    const todoCreated = await this.todoRepository.createTodo({
      title: command.title,
      user: command.user,
      todoItems: todoItemsIds._ids,
    });
    return todoCreated._id;
  }
}
