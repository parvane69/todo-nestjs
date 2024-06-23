import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../../infrastructure/repositories/todo-repository';
import { DeleteTodoItemCommand } from './delete-todo-item-command';
import { NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(private todoRepository: TodoRepository) {}

  async execute(command: DeleteTodoItemCommand) {
    const { todo, user, todoItem } = command;
    const checkExist = await this.todoRepository.findOne(todo, user);
    if (checkExist === null) throw new NotFoundException(`Todo not found`);
    return await this.todoRepository.pullTodoItem(todoItem, todo);
  }
}
