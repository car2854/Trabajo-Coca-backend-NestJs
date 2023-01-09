import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserNoAdminValidator{

  @IsNotEmpty()
  nombre: string;
  
  @IsNotEmpty() @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  permisos: string;

}