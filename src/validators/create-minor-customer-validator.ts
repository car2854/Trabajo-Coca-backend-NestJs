import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMinorCustomerValidator{
  
  @IsNotEmpty()
  contacto: string;
  
  @IsNotEmpty()
  nombre: string;
  
  @IsNotEmpty()
  tipo_negocio: string;
  
  @IsNumber()
  @IsNotEmpty()
  lat: number;
  
  @IsNumber()
  @IsNotEmpty()
  lng: number;
  
  @IsNumber()
  @IsNotEmpty()
  telefono: number;

}