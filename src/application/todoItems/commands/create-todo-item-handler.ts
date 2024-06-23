import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../../infrastructure/repositories/todo-repository';
import { TodoItemRepository } from '../../../infrastructure/repositories/todo-item-repository';
import { CreateTodoItemCommand } from './create-todo-item-command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(
    private todoRepository: TodoRepository,
    private todoItemRepository: TodoItemRepository,
  ) {}

  async execute(command: CreateTodoItemCommand) {
    const { description, priority, title, todo, user } = command;
    const checkExist = await this.todoRepository.findOne(todo, user);
    if (checkExist === null) throw new NotFoundException(`Todo not found`);
    const todoItemCreated = await this.todoItemRepository.createTodoItem({
      description,
      priority,
      title,
    });
    console.log(todoItemCreated, 'todoItemCreated');
    await this.todoRepository.pushTodoItem(todoItemCreated._id, todo);
    return todoItemCreated._id;
  }
}
