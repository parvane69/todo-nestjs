import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/gaurd/jwt/auth.guard';
import { TodosService } from '../../application/todos/todos.service';
import {
  TodoDetailsDto,
  TodoInputDto,
  TodoOutputDto,
} from '../../shared/dtos/todo.dto';
import mongoose from 'mongoose';
import { HttpResponseDto } from '../../shared/dtos/common.dto';
import {
  CreateTodoItemDto,
  TodoItemsOutputDto,
} from '../../shared/dtos/todo-item.dto';

@Controller('todos')
@ApiTags('Todos')
@UsePipes(new ValidationPipe())
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(AuthGuard)
  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'todo created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async register(
    @Body() todoInputDto: TodoInputDto,
    @Request() req,
  ): Promise<TodoOutputDto> {
    return await this.todosService.register(todoInputDto, req.user.id);
  }

  @Get('/:todoId')
  @UseGuards(AuthGuard)
  async getDetails(
    @Param('todoId') todoId: string,
    @Request() req,
  ): Promise<TodoDetailsDto> {
    const todoObjectId = new mongoose.Types.ObjectId(todoId);
    return await this.todosService.getDetails(todoObjectId, req.user.id);
  }

  // update a todo
  @Put('/:todoId')
  @UseGuards(AuthGuard)
  async editTodo(
    @Param('todoId') todoId: string,
    @Body() editTodoDTO: TodoInputDto,
    @Request() req,
  ): Promise<HttpResponseDto> {
    return this.todosService.editTodo(
      editTodoDTO,
      new mongoose.Types.ObjectId(todoId),
      req.user.id,
    );
  }

  @Delete('/:todoId')
  @UseGuards(AuthGuard)
  async deleteTodo(
    @Param('todoId') todoId: string,
    @Request() req,
  ): Promise<HttpResponseDto> {
    return this.todosService.deleteTodo(
      new mongoose.Types.ObjectId(todoId),
      req.user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Post('/:todoId/todoItems/add')
  @ApiResponse({
    status: 201,
    description: 'todoItem created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async addTodoItemsToTodo(
    @Body() todoItemInputDto: CreateTodoItemDto,
    @Request() req,
    @Param('todoId') todoId: string,
  ): Promise<TodoItemsOutputDto> {
    return await this.todosService.addTodoItem(
      todoItemInputDto,
      req.user.id,
      todoId,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:todoId/todoItems/:todoItemId/remove')
  @ApiResponse({
    status: 201,
    description: 'todoItem remove successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async removeTodoItemsToTodo(
    @Param('todoId') todoId: string,
    @Request() req,
    @Param('todoItemId') todoItemId: string,
  ): Promise<HttpResponseDto> {
    return await this.todosService.removeTodoItem(
      todoItemId,
      req.user.id,
      todoId,
    );
  }

  @Put('/:todoId/todoItems/:todoItemId/edit')
  @UseGuards(AuthGuard)
  async editTodoItem(
    @Param('todoId') todoId: string,
    @Request() req,
    @Param('todoItemId') todoItemId: string,
    @Body() editTodoItemDTO: CreateTodoItemDto,
  ): Promise<HttpResponseDto> {
    return this.todosService.editTodoItem(
      editTodoItemDTO,
      todoId,
      todoItemId,
      req.user.id,
    );
  }
}
