import { Controller, Get, Post, Put, Delete, Query, Param, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AccountingService } from './accounting.service';

@Controller('accounting')
export class AccountingController {


  constructor(
    private accountingService: AccountingService
  ){}
  
  @Get(':id')
  public async getAccountingTheWareHouse(@Param() param, @Res() res: Response){

    const wareHouse = await this.accountingService.findWareHouseById(param.id);

    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }

    const accounting = await this.accountingService.findAccountingByWareHouse(wareHouse);

    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: accounting
    });
  }

}
