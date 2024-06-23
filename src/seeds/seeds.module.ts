import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../domain/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            console.log('pre save user');
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
