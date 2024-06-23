import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '../domain/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedsService {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}
  async saveUserTest(): Promise<void> {
    await this.model.create({
      userName: 'testUser',
      password: await bcrypt.hash('123456', 12),
    });
  }
}
