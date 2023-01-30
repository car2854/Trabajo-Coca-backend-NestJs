import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProvisionValidator{

  @IsNotEmpty()
  producto_terminado_cod: string;

  @IsNotEmpty() @IsNumber()
  user_id: number;

  @IsNotEmpty() @IsNumber()
  cantidad: number;

  @IsNotEmpty() @IsNumber()
  almacen_id: number;
  
}