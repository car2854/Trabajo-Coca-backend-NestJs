import { IsNotEmpty, IsNumber } from "class-validator";

export class RemoveProductExecutiveValidator{

  @IsNotEmpty() @IsNumber()
  cantidad: number;

  @IsNotEmpty() @IsNumber()
  idAlmacen: number;
  
}