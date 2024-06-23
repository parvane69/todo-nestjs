import { ICommand } from '@nestjs/cqrs';
import mongoose from 'mongoose';

export class EditTodoCommand implements ICommand {
  constructor(
    public readonly todoId: mongoose.Types.ObjectId,
    public readonly title: string,
    public readonly user: string,
  ) {}
}
