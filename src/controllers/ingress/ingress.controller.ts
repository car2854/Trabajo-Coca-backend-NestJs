import { Controller, Get, Post, Put, Delete, Query, Param, Res, Req, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { Ingresos } from 'src/entities/entry.entity';
import { IngresosProductos } from 'src/entities/entry_product.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { CreateIngressValidator } from 'src/validators/create-ingress-validator';
import { FinishedProductService } from '../finished_product/finished_product.service';
import { WareHouseService } from '../ware-house/ware-house.service';
import { IngressService } from './ingress.service';

@Controller('ingress')
export class IngressController {

  constructor(
    private ingressService: IngressService,
    private wareHouseService: WareHouseService,
    private finishedProductService: FinishedProductService
  ){}

  @Post()
  public async createIngress(@Body() body: CreateIngressValidator, @Res() res: Response){

    const wareHouse = await this.wareHouseService.findOneById(body.almacene_id);
    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }

    // Buscar todos los productos]
    const notExistProducts = [];
    const products = await Promise.all(
      body.productos.map( async(product:any) => {
        const productData = await this.finishedProductService.findByCod(product.idProduct);
        if (!productData) notExistProducts.push(product.idProduct);
        return productData;
      })
    );
    
    // Si no existe un producto, me dira que productos con su supuesto COD no existen en el mensaje
    if (products.includes(null)){
      let msgError = `No existe el almacen ${notExistProducts.map((noProduct:any) => ' ' + noProduct)}`;
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: msgError
      })
    }
    
    const newIngress = new Ingresos();
    newIngress.almacen = wareHouse;
    newIngress.fecha = body.fecha;
    newIngress.nota = body.nota || '';
    const ingress = await this.ingressService.saveIngress(newIngress);
    
    const listNewsIngressProducts = await Promise.all([
      body.productos.map( (product:any) => {
        const newIngressProduct = new IngresosProductos;
        newIngressProduct.cantidad = product.amount;
        newIngressProduct.ingreso = ingress;
        newIngressProduct.producto_terminado = products.filter((productData:ProductosTerminados) => {
          return (productData.codigo === product.idProduct);
        }).map((finisedProduct:ProductosTerminados) => finisedProduct)[0];
        return this.ingressService.saveIngressProduct(newIngressProduct);
      })
    ]);

    return res.status(HttpStatus.OK).json({
      ok: true,
      ingress,
      listNewsIngressProducts
    });
  }


}
