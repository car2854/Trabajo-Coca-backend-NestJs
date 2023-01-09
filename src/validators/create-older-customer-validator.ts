import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOlderCustomerValidator{

  @IsNotEmpty()
  nombre: string;
  
  @IsNotEmpty()
  apellido: string;

  @IsNotEmpty()
  empresa: string;

  @IsNotEmpty()
  telefono_celular: string;

  @IsNotEmpty() @IsNumber()
  nit: number;
}