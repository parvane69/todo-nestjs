import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../../application/users/users.service';
import {
  UserRegistrationInputDto,
  UserRegistrationOutputDto,
  UserLoginInputDto,
  UserLoginOutputDto,
} from '../../shared/dtos/users.dto';
import { AuthGuard } from '../../shared/gaurd/jwt/auth.guard';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'user created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async register(
    @Body() userRegistrationInputDto: UserRegistrationInputDto,
  ): Promise<UserRegistrationOutputDto> {
    return await this.usersService.register(userRegistrationInputDto);
  }

  @Post('/login')
  async login(
    @Body() userLoginInputDto: UserLoginInputDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserLoginOutputDto> {
    const userInfo = await this.usersService.login(userLoginInputDto);
    response.cookie('jwt', userInfo.token, { httpOnly: true });
    return userInfo;
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getUser(@Request() req): Promise<void> {
    return req.user.id;
  }
}
