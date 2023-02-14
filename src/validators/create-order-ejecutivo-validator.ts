import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateOrderEjecutivoValidator{

  @IsNotEmpty()
  product: any;

  @IsNotEmpty() @IsNumber()
  clientes_menore_id: number; 
  
}