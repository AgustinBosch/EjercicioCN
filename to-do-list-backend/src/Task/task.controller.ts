import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './Dtos/createTask.dto';
import { UpdateTaskDto } from './Dtos/updateTask.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  updateById(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Post()
  save(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.save(createTaskDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<DeleteResult> {
    return this.taskService.remove(id);
  }
}
