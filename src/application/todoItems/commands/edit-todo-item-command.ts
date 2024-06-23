import { ICommand } from '@nestjs/cqrs';
import mongoose from 'mongoose';

export class EditTodoItemCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly priority: number,
    public readonly user: string,
    public readonly todo: string,
    public readonly todoItemId: mongoose.Types.ObjectId,
  ) {}
}
