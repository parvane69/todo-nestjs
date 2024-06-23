import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../../infrastructure/repositories/todo-repository';
import { EditTodoCommand } from './edit-todo-command';

@CommandHandler(EditTodoCommand)
export class EditTodoHandler implements ICommandHandler<EditTodoCommand> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(command: EditTodoCommand) {
    const { todoId, title } = command;

    const todoEditd = await this.todoRepository.editTodo(todoId, {
      title,
    });
    if (todoEditd.acknowledged)
      return {
        status: 201,
        message: 'Todo edited successfully.',
        data: {
          id: todoId,
        },
      };
    else
      return {
        status: 500,
        message: 'error in edit',
        data: {
          id: todoId,
        },
      };
  }
}
