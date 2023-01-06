
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFinishedProductValidator{

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  codigo: string;

  @IsNotEmpty() @IsNumber()
  unidad_medida_id: number;

  @IsNotEmpty() @IsNumber()
  categoria_id: number;

  @IsNotEmpty() @IsNumber()
  precio: number;

}