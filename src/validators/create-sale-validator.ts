import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, isNumber, } from 'class-validator';

export class CreateSaleValidator{

  @IsNotEmpty()
  fecha: Date;
  
  @IsNotEmpty() @IsBoolean()
  esta_almacen: boolean

  @IsOptional() @IsNumber()
  descuento: number;

  @IsNotEmpty() @IsBoolean()
  pagado: boolean

  @IsOptional()
  plazo_de_pago: Date;

  @IsOptional()
  nota: string;

  @IsNotEmpty() @IsNumber()
  clientes_mayore_id: number;

  @IsOptional() @IsNumber()
  almacene_id: number;

  @IsNotEmpty()
  products: []
  // {
  //   precio_total: 284.5,

  //   products: [
  //     {
  //       cod: 'P1',
  //       nameProduct: 'Producto 1',
  //       amount: 12,
  //       price: 19.5,
  //       totalPrice: 234,
  //       priceEditing: false
  //     },
  //     {
  //       cod: 'P2',
  //       nameProduct: 'Producto2',
  //       amount: 1,
  //       price: 50.5,
  //       totalPrice: 50.5,
  //       priceEditing: false
  //     }
  //   ]
  // }

}