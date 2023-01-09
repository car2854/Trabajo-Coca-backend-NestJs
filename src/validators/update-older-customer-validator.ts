import { IsNumber, IsOptional } from 'class-validator';
// {
//   nombre: 'Distribuidor',
//   apellido: 'Distribuidor Apellido',
//   nit: 123456,
//   empresa: 'Distribuidor Empresa',
//   telefono_celular: '1123456,1231251,9876543'
// }

export class UpdateOlderCustomerValidator{
  @IsOptional()
  nombre: string;
  
  @IsOptional()
  apellido: string;
  
  @IsOptional() @IsNumber()
  NIT: string;
  
  @IsOptional()
  empresa: string;

  @IsOptional()
  telefono_celular: string;
}