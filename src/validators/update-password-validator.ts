import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordValidator{
  @IsNotEmpty()
  password: string; 
}