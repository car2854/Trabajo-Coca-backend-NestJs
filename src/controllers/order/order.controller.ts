import { Controller, Get, Req, Post, Put, Delete, Query, Param, Res, Body, HttpStatus } from '@nestjs/common';
import e, { Response } from 'express';
import { DetallesPedidos } from 'src/entities/detail_order.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Pedidos } from 'src/entities/order.entity';
import { CreateOrderNoExecutiveValidator } from 'src/validators/create-order-no-executive-validator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

  constructor(
    private orderService: OrderService
  ){}

  @Get('getOrdersWeb')
  public async getOrdersWeb(@Res() res: Response){
    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'Todo esta bien :)'
    });
  }

  @Get('getOrdersByExecutives/:id')
  public async getOrdersByExecutives(@Param() param ,@Res() res: Response){

    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'probando'
    });

  }

  @Post()
  public async createOrderNoExecutive(@Req() req, @Body() body: CreateOrderNoExecutiveValidator, @Res() res: Response){
    const productString = JSON.parse(body.product);
    const productJson =  JSON.parse(productString);
    const [minorCustomer, user] = await Promise.all([
      this.orderService.findByIdMinorCustomer(body.clientes_menore_id),
      this.orderService.findByIdUser(req.uid)
    ]);

    if (!minorCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }

    const finishedProducts = await Promise.all(
      productJson.map( async (productBody:any) => {
        const finishedProduct = await this.orderService.findByCodFinishedProduct(productBody.codigo);
        return finishedProduct;
      })
    );

    if (finishedProducts.includes(null)){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe un producto terminado'
      });
    }

    const orderData = new Pedidos();
    orderData.cliente_menor = minorCustomer;
    orderData.user_id = user;
    const order = await this.orderService.saveOrder(orderData);

    await Promise.all([
      productJson.forEach(async(productBody:any) => {
        const detailOrderData = new DetallesPedidos();
        detailOrderData.cantidad = productBody.amount;
        detailOrderData.pedido = order;
        detailOrderData.precio = productBody.precio;
        detailOrderData.producto_terminado = finishedProducts.find((finishedProductData:ProductosTerminados) => {
          return finishedProductData.codigo === productBody.codigo
        });
        await this.orderService.saveDetailOrder(detailOrderData);
      })
    ]);    

    return res.status(HttpStatus.OK).json({
      ok: true,
      orderData
    });
    
  }


}
