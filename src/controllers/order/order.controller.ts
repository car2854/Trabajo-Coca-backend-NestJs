import { Controller, Get, Post, Put, Delete, Query, Param, Res, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('order')
export class OrderController {

  constructor(){}

  @Get('getOrdersWeb')
  public async getOrdersWeb(@Res() res: Response){
    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'Todo esta bien :)'
    });
  }

  @Get('getOrdersByExecutives/:id')
  public async getOrdersByExecutives(@Param() param ,@Res() res: Response){

    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'probando'
    });

  }


}
