import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRememberingValidator{

  @IsNotEmpty()
  nota: string;

  @IsNotEmpty() @IsNumber()
  clientes_menore_id: number;
  
}