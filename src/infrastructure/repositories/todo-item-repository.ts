import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, UpdateWriteOpResult } from 'mongoose';
import { TodoItem } from '../../domain/schemas/todoItem.schema';
import {
  CreateTodoItemDto,
  TodoItemsOutputDto,
} from '../../shared/dtos/todo-item.dto';
import { TodoItemOutputDto } from '../../shared/dtos/todo.dto';
@Injectable()
export class TodoItemRepository {
  constructor(
    @InjectModel('TodoItem') private readonly model: Model<TodoItem>,
  ) {}
  async createTodoItems(dto: CreateTodoItemDto[]): Promise<TodoItemsOutputDto> {
    const doc = await this.model.create(dto);
    return {
      _ids: doc?.map((item) => item._id),
    };
  }
  async createTodoItem(dto: CreateTodoItemDto): Promise<TodoItemOutputDto> {
    const doc = await this.model.create(dto);
    return {
      _id: doc?._id,
    };
  }

  async editTodoItem(
    _id: mongoose.Types.ObjectId,
    dto: CreateTodoItemDto,
  ): Promise<UpdateWriteOpResult> {
    const doc = await this.model.updateOne({ _id }, dto);
    return doc;
  }
}
