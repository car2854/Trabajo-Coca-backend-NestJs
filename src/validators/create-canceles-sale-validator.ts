import { IsNotEmpty } from "class-validator"

export class CreateCancelesSaleValidator{

  @IsNotEmpty()
  items_devueltos: boolean;
  
  @IsNotEmpty()
  descripcion: string;

}