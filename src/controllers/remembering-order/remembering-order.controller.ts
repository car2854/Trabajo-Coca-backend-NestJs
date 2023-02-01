import { Controller, Get, Post, Put, Delete, Query, Body, Param, Res, Req, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateRememberingValidator } from 'src/validators/create-remembering-validator';
import { RememberingOrderService } from './remembering-order.service';

@Controller('rememberingOrder')
export class RememberingOrderController {

  constructor(
    private rememberingService: RememberingOrderService
  ){}
  // /api/rememberingOrder/4

  @Get(':id')
  public async getRememberingOrder(@Param() param, @Res() res: Response){

    return res.status(HttpStatus.BAD_REQUEST).json({
      ok: false,
      msg: 'Probando :)'
    });

  }

  @Post()
  public async createRememberingOrder(@Body() body: CreateRememberingValidator, @Res() res: Response){

    const minorCusomer = await this.rememberingService.findByIdMinorCustomer(body.clientes_menore_id);
    if (!minorCusomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }

    // TODO: Crear nota entity

    return res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      msg: 'Probando :)'
    });
  }

}
