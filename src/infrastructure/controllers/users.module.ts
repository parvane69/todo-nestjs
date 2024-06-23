import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
//import { UsersRepository } from '../base/database/repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserHandler } from '../../application/users/commands/create-user-handler';
import { UserSaga } from '../../application/users/commands/user.saga';
import { GetUserHandler } from '../../application/users/queries/get-user-handler';
import { UsersService } from '../../application/users/users.service';
import { MapperService } from '../../base/utils/mapper/mapper.service';
import { User, UserSchema } from '../../domain/schemas/users.schema';
import { UsersRepository } from '../repositories/user-repository';
import { UsersListeners } from '../../application/users/events/users.listeners';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [GetUserHandler];
@Module({
  imports: [
    CqrsModule,
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
  controllers: [UsersController],
  providers: [
    UsersService,
    ...CommandHandlers,
    ...QueryHandlers,
    UsersRepository,
    JwtService,
    MapperService,
    UsersListeners,
    UserSaga,
  ],
})
export class UsersModule {}
