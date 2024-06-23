import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ type: String })
  _id: ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
