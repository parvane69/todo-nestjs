import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  TodoDetailsDto,
  TodoInputDto,
  TodoOutputDto,
} from '../../shared/dtos/todo.dto';
import { CreateTodoCommand } from './commands/create-todo-command';
import { GetTodoQuery } from './queries/get-todo-query';
import { HttpResponseDto } from '../../shared/dtos/common.dto';
import { DeleteTodoCommand } from './commands/delete-todo-command';
import { EditTodoCommand } from './commands/edit-todo-command';
import mongoose from 'mongoose';
import {
  CreateTodoItemDto,
  TodoItemsOutputDto,
} from '../../shared/dtos/todo-item.dto';
import { CreateTodoItemCommand } from '../todoItems/commands/create-todo-item-command';
import { DeleteTodoItemCommand } from '../todoItems/commands/delete-todo-item-command';
import { EditTodoItemCommand } from '../todoItems/commands/edit-todo-item-command';
@Injectable()
export class TodosService {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  async register(
    todoInput: TodoInputDto,
    user: string,
  ): Promise<TodoOutputDto> {
    const { title, todoItems } = todoInput;
    return this.commandBus.execute(
      new CreateTodoCommand(title, user, todoItems),
    );
  }

  async getDetails(
    todoId: mongoose.Types.ObjectId,
    user: string,
  ): Promise<TodoDetailsDto> {
    return this.queryBus.execute(new GetTodoQuery(todoId, user));
  }

  async editTodo(
    todoInput: TodoInputDto,
    todoId: mongoose.Types.ObjectId,
    user: string,
  ): Promise<HttpResponseDto> {
    return this.commandBus.execute(
      new EditTodoCommand(todoId, todoInput.title, user),
    );
  }

  async deleteTodo(
    todoId: mongoose.Types.ObjectId,
    user: string,
  ): Promise<HttpResponseDto> {
    return this.commandBus.execute(new DeleteTodoCommand(todoId, user));
  }

  async addTodoItem(
    todoItemInput: CreateTodoItemDto,
    user: string,
    todo: string,
  ): Promise<TodoItemsOutputDto> {
    const { title, description, priority } = todoItemInput;
    return this.commandBus.execute(
      new CreateTodoItemCommand(title, description, priority, user, todo),
    );
  }

  async removeTodoItem(
    todoItem: string,
    user: string,
    todo: string,
  ): Promise<HttpResponseDto> {
    return this.commandBus.execute(
      new DeleteTodoItemCommand(user, todo, todoItem),
    );
  }

  async editTodoItem(
    editTodoItemDTO: CreateTodoItemDto,
    todo: string,
    todoItem: string,
    user: string,
  ): Promise<HttpResponseDto> {
    const { title, description, priority } = editTodoItemDTO;

    return this.commandBus.execute(
      new EditTodoItemCommand(
        title,
        description,
        priority,
        user,
        todo,
        new mongoose.Types.ObjectId(todoItem),
      ),
    );
  }
}
