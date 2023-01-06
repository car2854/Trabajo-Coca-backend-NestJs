import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { UnidadDeMedida } from 'src/entities/unit_of_measuremet.entity';
import { UnitMeasurementValidator } from 'src/validators/create-unit-measurement-validator';
import { UnitMeasurementService } from './unit-measurement.service';

@Controller('unitMeasurement')
export class UnitMeasurementController {

  constructor(
    private unitMeasurementService: UnitMeasurementService
  ){}

  @Get()
  public async getUnitMeasurements(@Res() res: Response){
    const unitMeasurements = await this.unitMeasurementService.find();
    return res.status(HttpStatus.OK).json({
      ok:true,
      unitMeasurements
    });
  }

  @Post()
  public async createUnitMeasurement(@Body() body: UnitMeasurementValidator, @Res() res: Response){
    
    const newDataUnitMeasurement = new UnidadDeMedida();
    newDataUnitMeasurement.nombre = body.nombre;

    const unitMeasurement = await this.unitMeasurementService.save(newDataUnitMeasurement);

    return res.status(HttpStatus.OK).json({
      ok: true,
      unitMeasurement
    })

  }

}
