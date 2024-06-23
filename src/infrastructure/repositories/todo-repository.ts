import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, {
  Model,
  Mongoose,
  Schema,
  UpdateWriteOpResult,
} from 'mongoose';
import { Todo } from '../../domain/schemas/todo.schema';
import {
  CreateTodoDto,
  EditTodoDto,
  TodoDetailsDto,
  TodoOutputDto,
} from '../../shared/dtos/todo.dto';
import { TodoItem, TodoItemSchema } from '../../domain/schemas/todoItem.schema';
@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel('Todo') private readonly model: Model<Todo>,
    @InjectModel('TodoItem') private readonly todoItemModel: Model<TodoItem>,
  ) {}

  async createTodo(dto: CreateTodoDto): Promise<TodoOutputDto> {
    const doc = await this.model.create(dto);
    return { _id: doc.id };
  }

  async editTodo(
    _id: mongoose.Types.ObjectId,
    dto: EditTodoDto,
  ): Promise<UpdateWriteOpResult> {
    const doc = await this.model.updateOne({ _id }, dto);
    return doc;
  }

  async pushTodoItem(
    todoItemId: Schema.Types.ObjectId,
    todoId: string,
  ): Promise<boolean> {
    await this.model.findOneAndUpdate(
      { _id: todoId },
      { $push: { todoItems: todoItemId } },
      { upsert: true },
    );
    return true;
  }

  async pullTodoItem(todoItemId: string, todoId: string): Promise<boolean> {
    await this.model.updateOne(
      { _id: todoId },
      {
        $pull: { todoItems: new mongoose.Types.ObjectId(todoItemId) },
      },
      { upsert: true },
    );
    await this.todoItemModel.deleteOne({ _id: todoItemId });

    return true;
  }

  async deleteTodo(
    _id: mongoose.Types.ObjectId,
  ): Promise<mongoose.mongo.DeleteResult> {
    return await this.model.deleteOne(_id);
  }

  async findTodo(
    _id: mongoose.Types.ObjectId,
    user: string,
  ): Promise<TodoDetailsDto> {
    const todo = await this.model
      .findOne({
        _id,
        user,
      })
      .populate([
        {
          path: 'todoItems',
          select: 'title priority description _id',
          options: { sort: { priority: 1 } },
        },
        {
          path: 'user',
        },
      ])
      .exec();
    return todo;
  }
  async findOne(_id: string, user: string): Promise<Todo> {
    const todo = await this.model.findOne({
      _id,
      user,
    });
    return todo;
  }
}
