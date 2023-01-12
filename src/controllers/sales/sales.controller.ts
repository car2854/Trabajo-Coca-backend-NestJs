import { Controller, Get, Post, Put, Delete, Query, Param, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {

  constructor(
    private salesService: SalesService
  ){}

  @Get()
  public async getSales(@Res() res:Response){
    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'Todo esta bien :)'
    });
  }

}
