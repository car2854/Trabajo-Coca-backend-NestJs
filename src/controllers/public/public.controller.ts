import { Controller, Get, Post, Put, Delete, Res, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('public')
export class PublicController {

  constructor(){}

  @Get('minorCustomer')
  public async getMinorCustomer(@Res() res: Response){

    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: 'Todo bien :)'
    });

  }

}
