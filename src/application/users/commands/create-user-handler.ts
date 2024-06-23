import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user-command';
import { UsersRepository } from '../../../infrastructure/repositories/user-repository';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 as EventEmitter } from '@nestjs/event-emitter';
import { User } from '../../../domain/schemas/users.schema';
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userRepository: UsersRepository,
    private eventEmitter: EventEmitter,
  ) {}

  async execute(command: CreateUserCommand) {
    const { userName, password } = command;
    const hash_password = await bcrypt.hash(password, 12);
    const userCreated = await this.userRepository.createUser({
      password: hash_password,
      userName,
    });
    this.eventEmitter.emitAsync(
      'user.registered',
      Object.assign(new User(), { userCreated }),
    );
    return userCreated._id;
  }
}

// @CommandHandler(CreateUserCommand)
// export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
//   constructor(private readonly userRepository: UsersRepository) {}

//   async execute(command: CreateUserCommand): Promise<void> {
//     console.log('command');
//     //logic
//     const { userName, password } = command;

//     const userCreated = await this.userRepository.createUser({
//       password,
//       userName,
//     });
//     console.log('userCreated', userCreated);

//     // Emit a UserCreatedEvent
//     //const event = new UserCreatedEvent(UserId, title, content);
//     // event.commit();
//   }
// }
