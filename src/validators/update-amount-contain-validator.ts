import { IsNotEmpty } from 'class-validator';

export class UpdateAmountContainValidator{
  
  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  cantidad: number;

}