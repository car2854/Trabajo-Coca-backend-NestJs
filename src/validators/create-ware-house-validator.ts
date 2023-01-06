import { IsNotEmpty } from 'class-validator';

export class CreateWareHOuseValidator{

  @IsNotEmpty()
  nombre: string;
  
  @IsNotEmpty()
  direccion: string;
  
}