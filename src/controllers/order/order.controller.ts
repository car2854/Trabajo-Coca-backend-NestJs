import { Controller, Get, Req, Post, Put, Delete, Query, Param, Res, Body, HttpStatus } from '@nestjs/common';
import e, { Response } from 'express';
import { Contienen } from 'src/entities/contain.entity';
import { DetallesPedidos } from 'src/entities/detail_order.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Pedidos } from 'src/entities/order.entity';
import { CreateOrderNoExecutiveValidator } from 'src/validators/create-order-no-executive-validator';
import { UpdateOrderValidator } from 'src/validators/update-order-validator';
import { DataSource } from 'typeorm';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

  constructor(
    private orderService: OrderService,
    private dataSource: DataSource
  ){}

  @Get('getOrdersWeb')
  public async getOrdersWeb(@Query() query, @Res() res: Response){

    const { type, beginDate, endDate, clientName } = query;
    console.log(type);
    

    const orders = await this.orderService.findOrder(type || '', clientName);

    return res.status(HttpStatus.OK).json({
      ok: true,
      orders
    });
  }

  @Get('getDetailsOrderMinorCustomer/:id')
  public async getDetailOrderMinorCusomer(@Query() query, @Param() param ,@Res() res: Response){

    const {userName} = query;

    let initDate = (query.beginDate) ? new Date(Date.parse(query.beginDate)) : new Date('01-12-2000'); 
    let endDate = (query.endDate) ? new Date(new Date(Date.parse(query.endDate)).getTime() + 60 * 60 * 24 * 1000) : new Date('01-12-2500'); 

    const minorCustomer = await this.orderService.findByIdMinorCustomer(param.id);

    if (!minorCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      })
    }

    const orders = await this.orderService.findOrderByMinorCustomer(minorCustomer, initDate, endDate, userName ?? '');

    return res.status(HttpStatus.OK).json({
      ok: true,
      minorCustomer,
      orders
    })
  }

  @Get('getOrdersByExecutives/:id')
  public async getOrdersByExecutives(@Param() param ,@Res() res: Response){

    const user = await this.orderService.findByIdUser(param.id);

    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }

    const orders = await this.orderService.findOrderByUserExecutiveBackpack(user);

    return res.status(HttpStatus.OK).json({
      ok: true,
      orders
    });
    
  }
  @Get('getDetailsOrderAdmin/:id')
  public async getDetailsOrderAdmin(@Param() param ,@Res() res: Response){
    
    const order = await this.orderService.findOrderById(param.id);
    console.log(order);
    
    return res.status(HttpStatus.OK).json({
      ok: true,
      order
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

    if (order.estado != 'Sin asignar'){
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
      
      const finishedProducts = await Promise.all(
        order.detalles_pedidos.map((detailOrder: DetallesPedidos) => {
          return this.orderService.findByCodFinishedProduct(detailOrder.producto_terminado.codigo);
        })
      );

      // ---------------------------------------------------
      // Si un almacen no existe o fue eliminado de la base de datos, retornar un error diciendo que hay un producto la cual ya no existe o ha sido eliminado de la base de datos
      // ---------------------------------------------------
      if (finishedProducts.includes(null)){
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          msg: 'Hay un producto la cual ya no existe'
        })
      }
      
      let contains = await Promise.all(
        finishedProducts.map((finishedProduct: ProductosTerminados) => {
          return this.orderService.findContainByFinishedProductAndWareHouse(finishedProduct, wareHouse);
        })
      )
        
      // ---------------------------------------------------
      // Si un almacen no contienen un producto, mostrar mensaje de error explicando que producto no se encuentra en el almacen
      // ---------------------------------------------------
      if (contains.includes(null)){
        let messageError = 'Los productos: ';
        finishedProducts.forEach((finishedProduct: ProductosTerminados) => {
          if (!contains.find((contain: Contienen) => {
            if (!contain) return;
            return (contain.producto_terminado.codigo === finishedProduct.codigo)}
            )){
          messageError = messageError + ` ${finishedProduct.codigo}`;
        }
        })
        messageError = messageError + ' no existen en esta sucursal';
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          msg: messageError
        })
      }
      
      let listProductError = '';

      contains = contains.map((contain:Contienen) => {
        
        const detailOrder = order.detalles_pedidos.find((detailOrder:DetallesPedidos) => {
          if (detailOrder.producto_terminado.codigo === contain.producto_terminado.codigo) return detailOrder;
        });

        contain.cantidad = contain.cantidad - detailOrder.cantidad;
        if (contain.cantidad < 0) listProductError = listProductError + contain.producto_terminado.codigo + ' ';

        return contain;
      });


      if (listProductError != ''){
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          msg: 'No hay suficiente stock en los productos: ' + listProductError
        });
      }

      order.almacen = wareHouse;
      order.razon_cancelacion = '';
      order.estado = 'Aceptado';
      const {detalles_pedidos, ...data} = order;

      await Promise.all([
        contains.map((contain:Contienen) => {
          this.orderService.updateContain(contain.id, contain);
        }),
        
        this.orderService.updateOrder(order.id, data)
      ])

    }else{    // <------- Si quiere denegarlo
      
      order.estado = 'Denegado';
      
      order.razon_cancelacion = body.razonCancelacion;
      order.almacen = null;
      const {detalles_pedidos, ...data} = order;
      await this.orderService.updateOrder(order.id, data);
    }

    return res.status(HttpStatus.OK).json({
      ok: true,
      order
    });
  }


}
