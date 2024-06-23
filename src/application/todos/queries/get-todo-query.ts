import mongoose from 'mongoose';

export class GetTodoQuery {
  constructor(
    public readonly todoId: mongoose.Types.ObjectId,
    public readonly user: string,
  ) {}
}
