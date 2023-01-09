import { Controller, Get, Post, Put, Delete, Req, Res, Query, Body, Param, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MinorCustomerService } from './minor-customer.service';

@Controller('minorCustomer')
export class MinorCustomerController {

  constructor(
    private minorCustomerService: MinorCustomerService
  ){}

  @Get()
  public async getMinorCustomers(@Query() query,@Res() res: Response){

    const minorCustomers = await this.minorCustomerService.find(query.text || '');

    return res.status(HttpStatus.OK).json({
      ok: false,
      minorCustomers
    });
  }

}
