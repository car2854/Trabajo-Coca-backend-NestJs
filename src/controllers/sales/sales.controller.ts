import { Controller, Get, Post, Put, Delete, Query, Param, Body, HttpStatus, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { Contienen } from 'src/entities/contain.entity';
import { DetalleNoAlmacen } from 'src/entities/detail_no_ware_house.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Ventas } from 'src/entities/sale.entit';
import { VentasProductos } from 'src/entities/sale_product.entity';
import { newList } from 'src/helpers/filter-non-existent-values';
import { CreateSaleValidator } from 'src/validators/create-sale-validator';
import { DataSource } from 'typeorm';
import { FinishedProductService } from '../finished_product/finished_product.service';
import { OlderCustomerService } from '../older-customer/older-customer.service';
import { UserService } from '../user/user.service';
import { WareHouseService } from '../ware-house/ware-house.service';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {

  constructor(
    private salesService: SalesService,
    private olderCustomerService: OlderCustomerService,
    private wareHouseService: WareHouseService,
    private finishedProductService: FinishedProductService,
    private userService: UserService,
    private dataSoruce: DataSource
  ){}

  @Get()
  public async getSales(@Res() res:Response){

    const sales = await this.salesService.find();

    return res.status(HttpStatus.OK).json({
      ok: true,
      sales
    });
  }

  @Get('getDetailsSale/:id')
  public async getDetails(@Param() param ,@Res() res: Response){

    const sale = await this.salesService.findOneById(param.id);

    if (!sale){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe esa venta'
      });
    }

    return res.status(HttpStatus.OK).json({
      ok: true,
      sale
    });
  }

  @Post()
  public async createSale(@Body() body: CreateSaleValidator, @Req() req, @Res() res:Response){
    
    const [user, olderCustomer] = await Promise.all([
      this.userService.findById(req.uid),
      this.olderCustomerService.findById(body.clientes_mayore_id),
    ]);

    if (!olderCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }
    
    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }

    // Crear sales
    let sale;

    // Si esta en el almacen, hacer esto
    if (body.esta_almacen){
      const wareHouse = await this.wareHouseService.findOneById(body.almacen_id);
      if (!wareHouse){
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          msg: 'No existe ese almacen'
        });
      }      

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

      
      
      const saleData = new Ventas();
      saleData.cliente_mayor = olderCustomer;
      saleData.descuento =body.descuento;
      saleData.esta_almacen = body.esta_almacen;
      saleData.fecha = body.fecha;
      saleData.nota = body.nota;
      saleData.pagado = body.pagado;
      saleData.plazo_de_pago = body.plazo_de_pago;
      saleData.precio_total = body.precio_total;
      saleData.user = user;
      saleData.almacen = wareHouse;

      
      // Transactions
      const queryRunner = this.dataSoruce.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {

        sale = await queryRunner.manager.save(saleData);
        // await queryRunner.manager.save(sale);

        await Promise.all(
          body.products.map( async (saleProductBody:any) => {
            
            const product = products.find((product:ProductosTerminados) => product.codigo === saleProductBody.cod);
            
  
            const saleProductData = new VentasProductos();
            saleProductData.precio_individual = saleProductBody.price;
            saleProductData.precio_total = saleProductBody.price * saleProductBody.amount;
            saleProductData.cantidad = saleProductBody.amount;
            saleProductData.producto_terminado = product;
            saleProductData.ventas = sale;

            await queryRunner.manager.save(saleProductData);
            // Para descontar el stock, esta en el evento de ventas_productos

          })
        );

        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        console.log(error);
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          msg: error.message
        });
      } finally {
        await queryRunner.release();
      }
      
    }else{ //Si no esta en el almacen, hacer esto
      
      const saleData = new Ventas();
      saleData.cliente_mayor = olderCustomer;
      saleData.descuento =body.descuento;
      saleData.esta_almacen = body.esta_almacen;
      saleData.fecha = body.fecha;
      saleData.nota = body.nota;
      saleData.pagado = body.pagado;
      saleData.plazo_de_pago = body.plazo_de_pago;
      saleData.precio_total = body.precio_total;
      saleData.user = user;
      sale = await this.salesService.save(saleData);

      await Promise.all([
        body.products.forEach( async (productDataBody:any) => {

          const detailNoWareHouse = new DetalleNoAlmacen();
          detailNoWareHouse.cantidad = productDataBody.amount;
          detailNoWareHouse.nombre = productDataBody.nameProduct;
          detailNoWareHouse.precio_individual = productDataBody.price;
          detailNoWareHouse.precio_total = productDataBody.price * productDataBody.amount;
          detailNoWareHouse.venta_id = sale;

          await this.salesService.saveDetailNoWareHouse(detailNoWareHouse);

        })
      ]);
      
    }


    return res.status(HttpStatus.OK).json({
      ok: false,
      sales: sale
    });
  }
}
