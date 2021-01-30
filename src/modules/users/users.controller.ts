import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { get } from 'http';
import { UsersService } from './users.service';
import { Iuser } from '../../interfaces/Iuser.model';
import { Response } from 'express';
import { LogsInterceptor } from '../../interceptors/logs.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  
  @UseInterceptors(LogsInterceptor)
  @Get()
  getUsuarios() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    this.userService.getUser(id);
  }

  @HttpCode(201)
  @Post()
  createUser(@Body() user: Iuser) {
    return this.userService.createdUser(user);
  }

  @Put()
  updateUser(@Body() user: Iuser, @Res() res: Response) {
    try {
      const aux = this.userService.updateUser(user);
      console.log(aux);
      
      return res.send(aux).status(200);
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

}
