import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './Dtos/createTask.dto';
import { UpdateTaskDto } from './Dtos/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private TaskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.TaskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    await this.throwErrorIfNotExist(id);
    return this.TaskRepository.findOneBy({ id });
  }

  save(task: CreateTaskDto): Promise<Task> {
    return this.TaskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    let task = await this.findOne(id)
    task.title = updateTaskDto.title ?? task.title
    task.description = updateTaskDto.description ?? task.description
    task.isComplete = updateTaskDto.isComplete ?? task.isComplete
    return this.TaskRepository.save(task);
  }

  exist(id: number): Promise<boolean> {
    return this.TaskRepository.exists({ where: { id } });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.throwErrorIfNotExist(id);
    return this.TaskRepository.delete(id);
  }

  async throwErrorIfNotExist(id: number): Promise<void> {
    let exist = await this.exist(id);
    if (!exist) {
      throw new HttpException(`id: ${id} was not found`, HttpStatus.NOT_FOUND);
    }
  }
}
