import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../../infrastructure/repositories/todo-repository';
import { DeleteTodoCommand } from './delete-todo-command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(command: DeleteTodoCommand) {
    const { todoId, user } = command;
    const todo = await this.todoRepository.findTodo(todoId, user);
    if (todo === null) throw new NotFoundException(`Todo not found`);
    const todoDeleted = await this.todoRepository.deleteTodo(todoId);
    if (todoDeleted.acknowledged)
      return {
        status: 201,
        message: 'Todo deleted successfully.',
        data: {
          id: todoId,
        },
      };
    else
      return {
        status: 500,
        message: 'error in deleted',
        data: {
          id: todoId,
        },
      };
  }
}
