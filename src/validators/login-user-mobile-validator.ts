import { IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';

export class LoginUserMobileValidator{

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  userMobile: boolean;

}