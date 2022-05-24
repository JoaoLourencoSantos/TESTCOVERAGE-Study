import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  ValidationPipe,
} from '@nestjs/common';

import { GoalDTO } from './../dto/goal.dto';
import { ResponseDTO } from './../dto/response.dto';
import { GoalService } from './../services/goal.service';

@Controller('goal')
export class GoalController {
  constructor(private readonly service: GoalService) {}

  @Get()
  async findAll(@Query() query): Promise<ResponseDTO> {
    return this.service.findAll();
  }

  @Get('/one/:id')
  async findOne(@Param() params): Promise<ResponseDTO> {
    return this.service.find(params);
  }

  @Post()
  async create(@Body(ValidationPipe) goalDTO: GoalDTO): Promise<ResponseDTO> {
    return this.service.create(goalDTO);
  }

  @Put()
  async update(@Body(ValidationPipe) goalDTO: GoalDTO): Promise<ResponseDTO> {
    return this.service.update(goalDTO);
  }

  @Delete('/:id')
  async delete(@Param() params): Promise<ResponseDTO> {
    return this.service.delete(params);
  }
}
