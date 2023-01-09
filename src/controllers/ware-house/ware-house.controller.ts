import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { query, Response } from 'express';
import { Almacenes } from 'src/entities/ware_house.entity';
import { CreateWareHOuseValidator } from 'src/validators/create-ware-house-validator';
import { WareHouseService } from './ware-house.service';

@Controller('wareHouse')
export class WareHouseController {

  constructor(
    private wareHouseService: WareHouseService
  ){}

  @Get()
  public async getWareHouse(@Res() res: Response, @Query() query){
    const wareHouses = await this.wareHouseService.find(query.text);
    return res.status(HttpStatus.OK).json({
      ok: true,
      wareHouses
    }); 
  }

  @Get('getProductWare/:id')
  public async getProductByWareHoues(@Query() query,@Param() param, @Res() res: Response){
    const wareHouse = await this.wareHouseService
      .findOneById(
        parseInt(param.id || '0'), 
      );

    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      })
    }
    const contains = await this.wareHouseService.findContain(wareHouse, parseInt(query.category_id || '0'));
    return res.status(HttpStatus.OK).json({
      ok: true,
      contains
    })

  }

  @Post()
  public async createWareHouse(@Body() body: CreateWareHOuseValidator, @Res() res: Response){
    const newDataWareHouse = new Almacenes();
    newDataWareHouse.direccion = body.direccion;
    newDataWareHouse.nombre = body.nombre;
    const fatherWareHouse = await this.wareHouseService.findFather();
    newDataWareHouse.es_almacen_padre = (!fatherWareHouse)? true : false;
    const newWareHouse = await this.wareHouseService.save(newDataWareHouse);
    return res.status(HttpStatus.OK).json({
      ok: true,
      newWareHouse
    });
  }

}
