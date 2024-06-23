import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TodoItemDocument = HydratedDocument<TodoItem>;

@Schema()
export class TodoItem {
  @ApiProperty({ type: String })
  _id: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  priority: number;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
//export const Resource = mongoose.model('TodoItem', TodoItemSchema);
