import { IsOptional } from 'class-validator';

export class UpdateFinishedProductValidator{

  @IsOptional()
  nombre: string;

  @IsOptional()
  codigo: string;

  @IsOptional()
  unidad_medida: number;

  @IsOptional()
  precio: number;

  @IsOptional()
  categoria: number;

}