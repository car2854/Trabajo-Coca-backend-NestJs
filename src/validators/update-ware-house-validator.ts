import { IsOptional } from 'class-validator';

export class UpdateWareHouseValidator{

  @IsOptional()
  nombre: string;
  @IsOptional()
  direccion: string;

}