import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TodosService } from '../application/todos/todos.service';

import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';

describe('TodosService', () => {
  let service: TodosService;
  const user = '6675736b207fad2e8e8e34c4';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn().mockReturnValue({ title: 'shahan todo' }),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: jest
              .fn()
              .mockReturnValue({ _id: '6676dbd71624fe27305ec7b6' }),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });
  const todoInput = {
    title: 'title',
    todoItems: [{ description: 'desc1', priority: 1, title: 'item1' }],
  };
  it('should register new todo', async () => {
    // arrange

    // act
    const result = await service.register(todoInput, user);

    // assert
    expect(result).toHaveProperty('_id');
  });

  it('should return todo', async () => {
    // arrange
    const todoId = new mongoose.Types.ObjectId('6676dbd71624fe27305ec7b6');
    // act
    const result = await service.getDetails(todoId, user);

    // assert
    expect(result).toHaveProperty('title');
  });
});
