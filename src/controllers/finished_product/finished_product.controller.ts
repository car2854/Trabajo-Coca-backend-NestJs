import { Controller, Res, Query, HttpStatus, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { Response } from 'express';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { CreateFinishedProductValidator } from 'src/validators/create-finished-product-validator';
import { CategoryService } from '../category/category.service';
import { UnitMeasurementService } from '../unit-measurement/unit-measurement.service';
import { FinishedProductService } from './finished_product.service';

@Controller('finishedProduct')
export class FinishedProductController {

  constructor(
    private finishedProductService: FinishedProductService,
    private categoryService: CategoryService,
    private unitMeasurementService: UnitMeasurementService
  ){}

  @Get()
  public async getFinishedProducts(@Query() query, @Res() res: Response){
    const finishedProducts = await this.finishedProductService.find(query.text);
    return res.status(HttpStatus.OK).json({
      ok: true,
      finishedProducts
    });
  }

  @Post()
  public async createFinishedProduct(@Body() body: CreateFinishedProductValidator, @Res() res: Response){
    const [category, unitMeasurement] = await Promise.all([
      this.categoryService.findById(body.categoria_id),
      this.unitMeasurementService.findById(body.unidad_medida_id)
    ]);
    if (!category){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe esa categoria'
      });
    }
    if (!unitMeasurement){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe esa unidad de medida'
      });
    }
    const newDataFinishedProduct = new ProductosTerminados();
    newDataFinishedProduct.categoria = category;
    newDataFinishedProduct.codigo = body.codigo;
    newDataFinishedProduct.nombre = body.nombre;
    newDataFinishedProduct.precio = body.precio;
    newDataFinishedProduct.unidad_medida = unitMeasurement;
    const finishedProduct = await this.finishedProductService.save(newDataFinishedProduct);
    return res.status(HttpStatus.OK).json({
      ok: true,
      finishedProduct
    });
  }

}
