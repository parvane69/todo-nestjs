import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/schemas/users.schema';
import {
  UserOutputDto,
  UserRegistrationInputDto,
  UserRegistrationOutputDto,
} from '../../shared/dtos/users.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  //   async findOne(id: Types.ObjectId) {
  //     const doc = await this.model.findById(id);
  //     const orderRoot = new OrderRoot(id.toHexString());
  //     if (doc === null) {
  //       throw new NotFoundException(`Order with id ${id} does not exists`);
  //     }
  //     orderRoot.setData(doc);
  //     orderRoot.foundOrder();
  //     return orderRoot;
  //   }
  async findUser(userName: string): Promise<UserOutputDto> {
    const user = await this.model.findOne({ userName });
    if (user === null) throw new NotFoundException(`User not found`);
    return { id: user.id, password: user.password };
  }
  async createUser(
    dto: UserRegistrationInputDto,
  ): Promise<UserRegistrationOutputDto> {
    const doc = await this.model.create(dto);
    return { _id: doc.id };
  }
}
