import { Controller, Get, Post, Put, Delete, Res, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {

  constructor(
    private publicService: PublicService
  ){}

  @Get('minorCustomer')
  public async getMinorCustomer(@Res() res: Response){

    const minorCustomers = await this.publicService.find();

    return res.status(HttpStatus.OK).json({
      ok: true,
      minorCustomers
    });

  }

}
