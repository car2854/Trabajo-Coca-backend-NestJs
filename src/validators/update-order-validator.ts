import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateOrderValidator{

  @IsOptional() @IsNumber()
  almacen: number;

  @IsOptional()
  razonCancelacion: string;

  @IsNotEmpty() @IsBoolean()
  estado: boolean;

}