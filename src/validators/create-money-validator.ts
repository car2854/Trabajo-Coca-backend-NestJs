import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMoneyValidator{
  
  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  detalle: string;

  @IsNotEmpty() @IsNumber()
  monto: number;

  @IsNotEmpty() @IsNumber()
  idAlmacen: number;

}