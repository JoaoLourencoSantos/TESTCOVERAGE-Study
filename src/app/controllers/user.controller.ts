import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { ResponseDTO } from '../dto/response.dto';
import { UserDTO } from '../dto/user.dto';
import RepoService from '../services/user.service';
import { UserPutDTO } from './../dto/user.put.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: RepoService) {}

  @Get()
  async findAll(): Promise<ResponseDTO> {
    return this.service.findAll();
  }

  @Get('/one/:id')
  async findOne(@Param() params): Promise<ResponseDTO> {
    return this.service.find(params);
  }

  @Post()
  async create(@Body(ValidationPipe) user: UserDTO): Promise<ResponseDTO> {
    return this.service.create(user);
  }

  @Put()
  async update(@Body(ValidationPipe) user: UserPutDTO): Promise<ResponseDTO> {
    return this.service.update(user);
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<ResponseDTO> {
    return this.service.delete(params);
  }
}
