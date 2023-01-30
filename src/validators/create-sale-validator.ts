import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, isNumber, } from 'class-validator';

export class CreateSaleValidator{

  @IsNotEmpty()
  fecha: Date;
  
  @IsNotEmpty() @IsBoolean()
  esta_almacen: boolean

  @IsOptional() @IsNumber()
  descuento: number;

  @IsNotEmpty() @IsBoolean()
  pagado: boolean;

  @IsNotEmpty() @IsNumber()
  precio_total: number;

  @IsOptional()
  plazo_de_pago: Date;

  @IsOptional()
  nota: string;

  @IsNotEmpty() @IsNumber()
  clientes_mayore_id: number;

  @IsOptional() @IsNumber()
  almacen_id: number;

  @IsNotEmpty()
  products: []

}