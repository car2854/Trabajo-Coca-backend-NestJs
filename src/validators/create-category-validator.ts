import { IsNotEmpty } from 'class-validator';

export class CreateCategoryValidator{
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  sabor: string;
}