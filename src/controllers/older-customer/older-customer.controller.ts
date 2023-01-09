import { Controller, Req, Res, Param, Query, Body, Put, Post, Delete, Get, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ClientesMayores } from 'src/entities/older_customer.entity';
import { CreateOlderCustomerValidator } from 'src/validators/create-older-customer-validator';
import { UpdateOlderCustomerValidator } from 'src/validators/update-older-customer-validator';
import { OlderCustomerService } from './older-customer.service';

@Controller('olderCustomer')
export class OlderCustomerController {

  constructor(
    private olderCustomerService: OlderCustomerService
  ){}

  @Get()
  public async getOlderCustomers(@Query() query, @Res() res: Response){
    const olderCustomer = await this.olderCustomerService.find(query.text || '');
    return res.status(HttpStatus.OK).json({
      ok: true,
      olderCustomer
    });
  }

  @Get(':id')
  public async getOlderSustomer(@Param() param, @Res() res){
    const olderCustomer = await this.olderCustomerService.findById(param.id);
    if (!olderCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }
    return res.status(HttpStatus.OK).json({
      ok: true,
      olderCustomer
    });
  }

  @Put(':id')
  public async updateOlderCustomer(@Param() param, @Body() body: UpdateOlderCustomerValidator, @Res() res){
    const olderCustomer = await this.olderCustomerService.findById(param.id);
    if (!olderCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }

    await this.olderCustomerService.update(param.id, body);
    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: olderCustomer
    });
  }

  @Post()
  public async createOlderCustomer(@Body() body: CreateOlderCustomerValidator, @Res() res){
    const newOlderCustomer = new ClientesMayores();
    newOlderCustomer.NIT = body.nit;
    newOlderCustomer.apellido = body.apellido;
    newOlderCustomer.empresa = body.empresa;
    newOlderCustomer.nombre = body.nombre;
    newOlderCustomer.telefono_celular = body.telefono_celular;
    const olderCustomer = this.olderCustomerService.save(newOlderCustomer);
    return res.status(HttpStatus.OK).json({
      ok: true,
      olderCustomer
    });
  }

  @Delete(':id')
  public async deleteOlderCustomer(@Param() param, @Res() res){
    const olderCustomer = await this.olderCustomerService.findById(param.id);
    if (!olderCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }
    await this.olderCustomerService.delete(param.id);
    return res.status(HttpStatus.OK).json({
      ok: true,
      olderCustomer
    });
  }

}
