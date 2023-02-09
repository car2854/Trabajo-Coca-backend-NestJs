import { IsNumber, IsOptional } from "class-validator"

export class UpdateMoneyValidator{
  
    @IsOptional()
    tipo: string 
    @IsOptional()
    detalle: string
    @IsOptional() @IsNumber()
    monto: number
    @IsOptional()
    fecha: Date
  
}