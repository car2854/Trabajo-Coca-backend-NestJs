import { Controller, Get, Post, Put, Delete, Query, Param, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AccountingService } from './accounting.service';

@Controller('accounting')
export class AccountingController {


  constructor(
    private accountingService: AccountingService
  ){}
  
  @Get(':id')
  public async getAccountingTheWareHouse(@Res() res: Response){

    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'ok :)'
    });
  }

}
