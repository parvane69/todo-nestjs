import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { MapperService } from '../../base/utils/mapper/mapper.service';
import { Todo, TodoSchema } from '../../domain/schemas/todo.schema';
import { TodoRepository } from '../repositories/todo-repository';
import { CreateTodoHandler } from '../../application/todos/commands/create-todo-handler';
import { TodosController } from './todo.controller';
import { TodosService } from '../../application/todos/todos.service';
import { GetTodoHandler } from '../../application/todos/queries/get-todo-handler';
import { DeleteTodoHandler } from '../../application/todos/commands/delete-todo-handler';
import { EditTodoHandler } from '../../application/todos/commands/edit-todo-handler';
import { TodoItemRepository } from '../repositories/todo-item-repository';
import { TodoItem, TodoItemSchema } from '../../domain/schemas/todoItem.schema';
import { CreateTodoItemHandler } from '../../application/todoItems/commands/create-todo-item-handler';
import { DeleteTodoItemHandler } from '../../application/todoItems/commands/delete-todo-item-handler';
import { EditTodoItemHandler } from '../../application/todoItems/commands/edit-todo-item-handler';
export const QueryHandlers = [GetTodoHandler];
export const CommandHandlers = [
  CreateTodoHandler,
  DeleteTodoHandler,
  EditTodoHandler,
  CreateTodoItemHandler,
  DeleteTodoItemHandler,
  EditTodoItemHandler,
];
@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeatureAsync([
      {
        name: Todo.name,
        useFactory: () => {
          const schema = TodoSchema;
          schema.pre('save', function () {
            console.log('pre save todo');
          });
          return schema;
        },
      },
      {
        name: TodoItem.name,
        useFactory: () => {
          const schema = TodoItemSchema;
          schema.pre('save', function () {
            console.log('pre save todoItem');
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [
    TodosService,
    ...CommandHandlers,
    ...QueryHandlers,
    TodoRepository,
    TodoItemRepository,
    JwtService,
    MapperService,
    TodoItem,
  ],
})
export class TodosModule {}
