import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './CreateTask.dto.js';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
