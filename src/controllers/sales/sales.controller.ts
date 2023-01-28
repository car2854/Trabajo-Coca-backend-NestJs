import { Controller, Get, Post, Put, Delete, Query, Param, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { Contienen } from 'src/entities/contain.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { newList } from 'src/helpers/filter-non-existent-values';
import { CreateSaleValidator } from 'src/validators/create-sale-validator';
import { FinishedProductService } from '../finished_product/finished_product.service';
import { OlderCustomerService } from '../older-customer/older-customer.service';
import { WareHouseService } from '../ware-house/ware-house.service';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {

  constructor(
    private salesService: SalesService,
    private olderCustomerService: OlderCustomerService,
    private wareHouseService: WareHouseService,
    private finishedProductService: FinishedProductService
  ){}

  @Get()
  public async getSales(@Res() res:Response){
    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'Todo esta bien :)'
    });
  }

  @Post()
  public async createSale(@Body() body, @Res() res:Response){

    // CreateSaleValidator

    // Buscar el cliente mayor
    const olderCustomer = await this.olderCustomerService.findById(body.clientes_mayore_id);
    if (!olderCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }

    // Si esta en el almacen, hacer esto
    if (body.esta_almacen){
      const wareHouse = await this.wareHouseService.findOneById(body.almacene_id);
      if (!wareHouse){
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          msg: 'No existe ese almacen'
        });
      }      

      // body.products = [
      //   { cod: 'P1' },
      //   { cod: 'P2' },
      //   { cod: 'P3' },
      // ];

      const products = await Promise.all(
        body.products.map((product:any) => {
          return this.finishedProductService.findByCod(product.cod);
        })
      );

      // Hay en el body codigo de productos que no existen, retornar NOT_FOUND
      if (products.includes(null)){
        let cod = '';
        newList(body.products, products).forEach((element:any) => {
          if (cod.length == 0) cod = element.cod
          else cod = cod + ', ' + element.cod;
        });
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          msg: `Los productos con los codigos ${cod} no existen`
        });
      }

      // TODO: Aqui almacenar en las ventas con almacen, y lueog hacer un trigger donde descuente, pero ojo, usar transiciones y probar muchas veces
      console.log(products);
      


      // console.log(body.products);
      // const contains = await Promise.all(
      //   products.map( async (product:ProductosTerminados) => {
      //     // Obtener la cantidad que tienen los productos en este almacen, en caso de que no exista la tabla contienen donde muestra cuantos productos hay en un almacen, 
      //     // el id de dicha tabla sera -1, que hace referencia a que no existe ese producto en ese almacen, la cual retornara un error explicando lo que paso
      //     let aux = await this.finishedProductService.findContain(product, wareHouse);
      //     if (aux) aux.producto_terminado = product
      //     else aux = {
      //       almacen: wareHouse,
      //       cantidad: 0,
      //       id: -1,
      //       maximo: 0,
      //       minimo: 0,
      //       producto_terminado: product
      //     };
      //     return aux;
      //   })
      // );

      // if (contains.some((contains: Contienen) => contains.id === -1)){
      //   return res.status(HttpStatus.)
      // }
      

      
    }else{ //Si no esta en el almacen, hacer esto
      
    }




    return res.status(HttpStatus.BAD_REQUEST).json({
      ok: false,
      msg: 'Proebando'
    });
  }
}
