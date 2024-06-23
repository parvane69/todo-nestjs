import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TodoItem } from './todoItem.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @ApiProperty({ type: String })
  _id: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ ref: 'TodoItem', type: mongoose.Types.ObjectId })
  todoItems: [{ type: mongoose.Schema.Types.ObjectId; ref: 'TodoItem' }];
  //todoItems: TodoItem[];
}
export const TodoSchema = SchemaFactory.createForClass(Todo);
