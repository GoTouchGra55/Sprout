import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  title: string;

  @IsOptional()
  userId: number;
  description?: string;
  completed: boolean;
  @IsIn(['Low', 'Medium', 'High'])
  priority: 'Low' | 'Medium' | 'High';
}
