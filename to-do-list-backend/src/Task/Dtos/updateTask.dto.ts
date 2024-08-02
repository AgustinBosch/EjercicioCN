import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty()
  title: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  isComplete: boolean | null;
}
