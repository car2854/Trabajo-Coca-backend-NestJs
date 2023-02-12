import { Controller, Get, Post, Put, Delete, Query, Param, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AccountingService } from './accounting.service';

@Controller('accounting')
export class AccountingController {


  constructor(
    private accountingService: AccountingService
  ){}
  
  @Get(':id')
  public async getAccountingTheWareHouse(@Param() param, @Query() query, @Res() res: Response){

    let initDate = (query.initDate) ? new Date(Date.parse(query.initDate)) : new Date('01-12-2000'); 
    let endDate = (query.endDate) ? new Date(new Date(Date.parse(query.endDate)).getTime() + 60 * 60 * 24 * 1000) : new Date('01-12-2500'); 

    console.log(initDate);
    

    const wareHouse = await this.accountingService.findWareHouseById(param.id);

    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }

    const accounting = await this.accountingService.findAccountingByWareHouse(wareHouse, initDate, endDate);

    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: accounting
    });
  }

}
