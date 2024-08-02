import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './Task/task.entity';
import { TaskController } from './Task/task.controller';
import { TaskService } from './Task/task.service';
import { TaskModule } from './Task/task.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase',
      entities: [Task],
      synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
