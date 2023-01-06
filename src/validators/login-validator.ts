import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginValidator{
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}