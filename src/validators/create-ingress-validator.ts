import { IsNotEmpty, IsOptional, IsNumber, IsRFC3339 } from 'class-validator';

export class CreateIngressValidator{
  @IsNotEmpty() @IsNumber()
  almacen_id: number;
  @IsNotEmpty()
  fecha: Date;
  @IsOptional()
  nota: string;
  @IsNotEmpty()
  productos: []
}