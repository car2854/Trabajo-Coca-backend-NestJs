import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserValidator{

  @IsEmail()
  email: string;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  password: string

}