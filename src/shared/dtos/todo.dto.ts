import { MinLength, MaxLength } from 'class-validator';
import { Mapped } from '../../base/utils/mapper/mapper.decorator';
import mongoose, { ObjectId } from 'mongoose';
import { IsString } from 'class-validator';
import { CreateTodoItemDto } from './todo-item.dto';

export class TodoInputDto {
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  title: string;

  todoItems: CreateTodoItemDto[];
}
export class CreateTodoDto {
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  title: string;

  user: string;
  todoItems: mongoose.Schema.Types.ObjectId[];
}

export class EditTodoDto {
  @MinLength(3)
  @MaxLength(25)
  @IsString()
  title: string;
}

export class TodoOutputDto {
  @Mapped() _id: ObjectId;
}
export class TodoItemOutputDto {
  @Mapped() _id: ObjectId;
}
export class TodoDetailsDto {
  @Mapped() title: string;
}
