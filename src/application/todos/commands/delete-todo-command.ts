import { ICommand } from '@nestjs/cqrs';
import mongoose from 'mongoose';

export class DeleteTodoCommand implements ICommand {
  constructor(
    public readonly todoId: mongoose.Types.ObjectId,
    public readonly user: string,
  ) {}
}
