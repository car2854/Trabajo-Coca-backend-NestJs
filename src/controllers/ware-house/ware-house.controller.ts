import { Body, Controller, Get, HttpStatus, Param, Post, Put, Delete, Query, Res } from '@nestjs/common';
import { query, Response } from 'express';
import { Almacenes } from 'src/entities/ware_house.entity';
import { CreateWareHOuseValidator } from 'src/validators/create-ware-house-validator';
import { UpdateWareHouseValidator } from 'src/validators/update-ware-house-validator';
import { WareHouseService } from './ware-house.service';

@Controller('wareHouse')
export class WareHouseController {

  constructor(
    private wareHouseService: WareHouseService
  ){}

  @Get()
  public async getWareHouses(@Res() res: Response, @Query() query){
    const wareHouses = await this.wareHouseService.find(query.text);
    return res.status(HttpStatus.OK).json({
      ok: true,
      wareHouses
    }); 
  }

  @Get(':id')
  public async getWareHouse(@Param() param, @Res() res: Response){
    const wareHouse = await this.wareHouseService.findOneById(param.id);
    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }
    return res.status(HttpStatus.OK).json({
      ok: true,
      wareHouse
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
    const contains = await this.wareHouseService.findContain(wareHouse, parseInt(query.category_id || '0'), query.name);
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

  @Put(':id')
  public async updateWareHouse(@Param() param, @Body() body: UpdateWareHouseValidator, @Res() res: Response){
    const wareHouse = await this.wareHouseService.findOneById(param.id);
    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }
    await this.wareHouseService.update(param.id,body);
    return res.status(HttpStatus.OK).json({
      ok: true,
      wareHouse
    }); 
  }

  @Put('changeFather/:id')
  public async changeFatherWareHoues(@Param() param, @Res() res: Response){
    const [wareHouse, warehouseFather] = await Promise.all([
      this.wareHouseService.findOneById(param.id),
      this.wareHouseService.findFather(),
    ]);
    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }
    if (wareHouse.es_almacen_padre){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'Este almacen ya es un almacen padre'
      });
    }
    await Promise.all([
      this.wareHouseService.update(param.id, {es_almacen_padre: true}),
      this.wareHouseService.update(warehouseFather.id, {es_almacen_padre: false})
    ]);
    wareHouse.es_almacen_padre = true;
    return res.status(HttpStatus.OK).json({
      ok: true,
      wareHouse
    });
  }

  @Delete(':id')
  public async deleteWareHouse(@Param() param, @Res() res: Response){
    const wareHouse = await this.wareHouseService.findOneById(param.id);
    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }
    if (wareHouse.es_almacen_padre){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'No puede eliminar a un almacen padre'
      });
    }
    await this.wareHouseService.delete(param.id);
    return res.status(HttpStatus.OK).json({
      ok: true,
      wareHouse
    });
  }

}
