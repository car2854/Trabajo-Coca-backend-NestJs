import { IsNotEmpty } from 'class-validator';

export class UnitMeasurementValidator{

  @IsNotEmpty()
  nombre: string;

}