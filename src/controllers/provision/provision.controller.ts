import { Controller, Get, Post, Put, Delete, Query, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Disposicion } from 'src/entities/disposition.entity';
import { HistorialDisposicion } from 'src/entities/disposition_history.entity';
import { CreateProvisionValidator } from 'src/validators/create-provision-validator';
import { FinishedProductService } from '../finished_product/finished_product.service';
import { UserService } from '../user/user.service';
import { WareHouseService } from '../ware-house/ware-house.service';
import { ProvisionService } from './provision.service';

@Controller('provision')
export class ProvisionController {

  constructor(
    private provisionService: ProvisionService,
    private userService: UserService,
    private finishedProductService: FinishedProductService,
    private wareHouseService: WareHouseService
  ){}

  @Get(':id')
  public async getProvisions(@Param() param, @Res() res: Response){
    const user = await this.userService.findById(param.id);
    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }
    const provisions = await this.provisionService.find(user);
    return res.status(HttpStatus.OK).json({
      ok: true,
      provisions
    });
  }

  @Post()
  public async assingProduct(@Body() body: CreateProvisionValidator,@Res() res: Response){
    const [finishedProduct, user, wareHouse] = await Promise.all([
      this.finishedProductService.findByCod(body.producto_terminado_cod),
      this.userService.findById(body.user_id),
      this.wareHouseService.findOneById(body.almacene_id)
    ]);
    if (!finishedProduct){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese producto'
      });
    }
    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }
    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }
    let provision = await this.provisionService.findByUserProduct(user, finishedProduct);
    const contains = await this.provisionService.findContainProduct(finishedProduct, wareHouse);


    if (!contains){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'No existe esa cantidad'
      });
    }
    if (contains.cantidad - body.cantidad < 0){
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'No existe esa cantidad'
      });
    }

    let provisionUpdate;

    await this.provisionService.toDiscountProductContain(contains.id, contains.cantidad - body.cantidad);
    if (provision){
      
      await this.provisionService.increaseProvition(provision.id, provision.cantidad + body.cantidad);

      provision.cantidad = provision.cantidad + body.cantidad;
      provisionUpdate = provision;

      const newHistoryDisposition = new HistorialDisposicion();
      newHistoryDisposition.almacen_id = wareHouse;
      newHistoryDisposition.cantidad = body.cantidad;
      newHistoryDisposition.disposicion_id = provision;
      await this.provisionService.saveHistoryProvition(newHistoryDisposition);

    }else{
      
      const newDisposition = new Disposicion();
      newDisposition.cantidad = body.cantidad;
      newDisposition.productos_terminado = finishedProduct;
      newDisposition.user_id = user;
      provisionUpdate = await this.provisionService.saveProvition(newDisposition);

      const newHistoryDisposition = new HistorialDisposicion();
      newHistoryDisposition.almacen_id = wareHouse;
      newHistoryDisposition.cantidad = body.cantidad;
      newHistoryDisposition.disposicion_id = provisionUpdate;
      await this.provisionService.saveHistoryProvition(newHistoryDisposition);

    }
    
    return res.status(HttpStatus.OK).json({
      ok: true,
      provision: provisionUpdate
    })
  }

}
