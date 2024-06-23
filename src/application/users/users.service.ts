import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/users/commands/create-user-command';
import { GetUserQuery } from '../../application/users/queries/get-user-query';
import {
  UserRegistrationInputDto,
  UserRegistrationOutputDto,
  UserLoginInputDto,
  UserLoginOutputDto,
} from '../../shared/dtos/users.dto';
@Injectable()
export class UsersService {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private jwtService: JwtService,
  ) {}

  async register(
    userRegistrationInputDto: UserRegistrationInputDto,
  ): Promise<UserRegistrationOutputDto> {
    const { userName, password } = userRegistrationInputDto;
    return this.commandBus.execute(new CreateUserCommand(userName, password));
  }
  async login(
    userLoginInputDto: UserLoginInputDto,
  ): Promise<UserLoginOutputDto> {
    const { userName, password } = userLoginInputDto;
    const user = await this.queryBus.execute(new GetUserQuery(userName));
    if (!user) throw new NotFoundException('user not found');
    if (!(await bcrypt.compare(password, user.password)))
      throw new NotFoundException('password is wrong');

    const jwt = await this.jwtService.signAsync(
      { id: user.id, userName: user.userName },
      { secret: process.env.SECRET_KEY },
    );
    return {
      ...user,
      token: jwt,
      message: 'success',
    };
  }
}
//   async getUser(request: Request): Promise<UserOutputDto> {
//     try {
//       const cookie = request.cookies['jwt'];
//       const data = await this.jwtService.verifyAsync(cookie, {
//         secret: process.env.SECRET_KEY,
//       });

//       if (!data) throw new UnauthorizedException();
//       const user = await this.usersRepository.findOneBy({
//         id: data['id'],
//       });
//       return this.mapper.map(user, UserOutputDto);
//     } catch {
//       throw new UnauthorizedException();
//     }
//   }
// }
