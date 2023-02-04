import { Controller, Get, Req, Post, Put, Delete, Query, Param, Res, Body, HttpStatus } from '@nestjs/common';
import e, { Response } from 'express';
import { DetallesPedidos } from 'src/entities/detail_order.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Pedidos } from 'src/entities/order.entity';
import { CreateOrderNoExecutiveValidator } from 'src/validators/create-order-no-executive-validator';
import { UpdateOrderValidator } from 'src/validators/update-order-validator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

  constructor(
    private orderService: OrderService
  ){}

  @Get('getOrdersWeb')
  public async getOrdersWeb(@Res() res: Response){

    const orders = await this.orderService.findOrder();

    return res.status(HttpStatus.OK).json({
      ok: true,
      orders
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
    orderData.user = user;
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
        const detail = await this.orderService.saveDetailOrder(detailOrderData);
        console.log(detail);
        
      })
    ]);    



    return res.status(HttpStatus.OK).json({
      ok: true,
      orderData
    });
    
  }

  @Put('sendResponseOrder/:id')
  public async updateOrder(@Req() req, @Body() body: UpdateOrderValidator, @Res() res: Response){

    const order = await this.orderService.findOrderById(req.id);

    if (!order){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese pedido'
      });
    }

    if (order.estado != 'Sin-asignar'){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: `Este pedido ya a sido ${order.estado}`
      });
    }

    // TODO: <------- Si quiere aceptarlo
    
    if (body.estado){
      const wareHouse = await this.orderService.findByIdWareHouse(body.almacen);

      if (!wareHouse){
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          msg: 'No existe ese almacen'
        });
      }

      order.estado = 'Aceptado';
      order.almacen = wareHouse;
      
    }else{    // <------- Si quiere denegarlo
      order.estado = 'Denegado';
      order.razon_cancelacion = body.razonCancelacion;
      await this.orderService.updateOrder(order.id, order);

    }

    return res.status(HttpStatus.NOT_FOUND).json({
      ok: true,
      order
    });
  }


}
