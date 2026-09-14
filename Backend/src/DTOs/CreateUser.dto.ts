import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @IsEmail()
  @MinLength(2)
  email: string;
}
