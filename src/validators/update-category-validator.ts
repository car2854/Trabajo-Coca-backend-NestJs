import { IsOptional } from 'class-validator';

export class UpdateCategoryValidator{

  @IsOptional()
  nombre: string;
  @IsOptional()
  sabor: string;

}