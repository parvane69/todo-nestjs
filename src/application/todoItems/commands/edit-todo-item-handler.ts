import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from '../../../infrastructure/repositories/todo-repository';
import { EditTodoItemCommand } from './edit-todo-item-command';
import { NotFoundException } from '@nestjs/common';
import { TodoItemRepository } from '../../../infrastructure/repositories/todo-item-repository';

@CommandHandler(EditTodoItemCommand)
export class EditTodoItemHandler
  implements ICommandHandler<EditTodoItemCommand>
{
  constructor(
    private todoRepository: TodoRepository,
    private todoItemRepository: TodoItemRepository,
  ) {}

  async execute(command: EditTodoItemCommand) {
    const { todo, title, user, description, priority, todoItemId } = command;

    const checkExist = await this.todoRepository.findOne(todo, user);
    if (checkExist === null) throw new NotFoundException(`Todo not found`);

    const todoItemEditd = await this.todoItemRepository.editTodoItem(
      todoItemId,
      {
        title,
        description,
        priority,
      },
    );
    if (todoItemEditd.acknowledged)
      return {
        status: 201,
        message: 'Todo item edited successfully.',
        data: {
          id: todoItemId,
        },
      };
    else
      return {
        status: 500,
        message: 'error in edit',
        data: {
          id: todoItemId,
        },
      };
  }
}
