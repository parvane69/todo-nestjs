import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoQuery } from './get-todo-query';
import { TodoRepository } from '../../../infrastructure/repositories/todo-repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(query: GetTodoQuery) {
    const { todoId, user } = query;
    const todo = await this.todoRepository.findTodo(todoId, user);
    if (todo === null) throw new NotFoundException(`Todo not found`);
    return todo;
  }
}
