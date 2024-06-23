import { MinLength, MaxLength } from 'class-validator';
import { IsString } from 'class-validator';
import { Mapped } from '../../base/utils/mapper/mapper.decorator';
import mongoose, { Schema, Types } from 'mongoose';
export class CreateTodoItemDto {
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  title: string;

  @MinLength(0)
  @MaxLength(125)
  @IsString()
  description: string;

  priority: number;
}

export class TodoItemsOutputDto {
  @Mapped() _ids: mongoose.Schema.Types.ObjectId[];
}
