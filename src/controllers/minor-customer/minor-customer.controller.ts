import { Controller, Get, Post, Put, Delete, Req, Res, Query, Body, Param, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { CreateMinorCustomerValidator } from 'src/validators/create-minor-customer-validator';
import { UserService } from '../user/user.service';
import { MinorCustomerService } from './minor-customer.service';

@Controller('minorCustomer')
export class MinorCustomerController {

  constructor(
    private minorCustomerService: MinorCustomerService,
    private userService: UserService
  ){}

  @Get()
  public async getMinorCustomers(@Query() query,@Res() res: Response){
    const minorCustomers = await this.minorCustomerService.find(query.text || '');
    return res.status(HttpStatus.OK).json({
      ok: false,
      minorCustomers
    });
  }

  @Post()
  public async createMinorCustomer(@Req() req,@Body() body: CreateMinorCustomerValidator, @Res() res:Response){
    console.log(req.uid);
    const user = await this.userService.findById(req.uid);
    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }
    const minorCustomerData = new ClientesMenores();
    minorCustomerData.contacto = body.contacto;
    minorCustomerData.lat = body.lat;
    minorCustomerData.lng = body.lng;
    minorCustomerData.nombre = body.nombre;
    minorCustomerData.tipo_negocio = body.tipo_negocio;
    minorCustomerData.telefono = body.telefono;
    minorCustomerData.user = user;
    const minorCustomer = await this.minorCustomerService.save(minorCustomerData);
    return res.status(HttpStatus.OK).json({
      ok: true,
      minorCustomer
    });
  }

  @Post(':id/cancelMinorCustomer')
  public async cancelVisitMinorCustomer(@Param() param, @Res() res: Response){
    const minorCustomer = await this.minorCustomerService.findById(param.id);
    if (!minorCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }
    const data = {
      ultima_vez: new Date('01/01/2001')
    };
    await this.minorCustomerService.update(param.id, data);
    return res.status(HttpStatus.OK).json({
      ok: true,
      minorCustomer
    });
  }

  @Post(':id/visitNow')
  public async visitMinorCustomer(@Param() param, @Res() res: Response){
    const minorCustomer = await this.minorCustomerService.findById(param.id);
    if (!minorCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }
    const data = {
      ultima_vez: new Date()
    };
    await this.minorCustomerService.update(param.id, data);
    return res.status(HttpStatus.OK).json({
      ok: true,
      minorCustomer
    });
  }

  @Delete(':id')
  public async deleteMinorCustomer(@Param() param, @Res() res:Response){
    const minorCustomer = this.minorCustomerService.findById(param.id);
    if (!minorCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese clientes mayoristas'
      });
    }
    await this.minorCustomerService.update(param.id, {is_active: false});
    return res.status(HttpStatus.OK).json({
      ok: false,
      minorCustomer
    });
  }

}
