import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CanActivate } from '@nestjs/common/interfaces';
import { UserOutputDto } from '../../shared/dtos/users.dto';

export const UseAuth = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  ...guards: (CanActivate | Function)[]
): MethodDecorator & ClassDecorator => {
  return applyDecorators(UseGuards(...guards), ApiBearerAuth('JWT-auth'));
};

export const User = createParamDecorator(
  (data: keyof UserOutputDto, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user: UserOutputDto = req?.user;
    return data ? user?.[data] : user;
  },
);
