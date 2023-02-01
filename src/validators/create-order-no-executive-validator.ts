import { IsNotEmpty,IsNumber } from "class-validator";

export class CreateOrderNoExecutiveValidator{

  @IsNotEmpty()
  product: any;

  @IsNotEmpty() @IsNumber()
  clientes_menore_id: number;

}