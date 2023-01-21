import { Controller, Get, Post, Put, Delete, Query, Body, Param, Res, Req, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('rememberingOrder')
export class RememberingOrderController {


  // /api/rememberingOrder/4

  @Get(':id')
  public async getRememberingOrder(@Param() param, @Res() res: Response){

    return res.status(HttpStatus.BAD_REQUEST).json({
      ok: false,
      msg: 'Probando :)'
    });

  }

}
