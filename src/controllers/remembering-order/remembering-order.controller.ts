import { Controller, Get, Post, Put, Delete, Query, Body, Param, Res, Req, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { NotasPedidos } from 'src/entities/note_orders_entity';
import { CreateRememberingValidator } from 'src/validators/create-remembering-validator';
import { RememberingOrderService } from './remembering-order.service';

@Controller('rememberingOrder')
export class RememberingOrderController {

  constructor(
    private rememberingService: RememberingOrderService
  ){}

  @Get(':id')
  public async getRememberingOrder(@Param() param, @Res() res: Response){

    const minorCustomer = await this.rememberingService.findByIdMinorCustomer(param.id);

    if (!minorCustomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }

    const notes = await this.rememberingService.findNotesByMinorCustomer(minorCustomer);

    return res.status(HttpStatus.OK).json({
      ok: true,
      'rememberingOrders': notes
    });

  }

  @Post()
  public async createRememberingOrder(@Req() req, @Body() body: CreateRememberingValidator, @Res() res: Response){


    const [minorCusomer, user] = await Promise.all([
      this.rememberingService.findByIdMinorCustomer(body.clientes_menore_id),
      this.rememberingService.findUserById(req.uid)
    ])

    if (!minorCusomer){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese cliente'
      });
    }

    const noteData = new NotasPedidos();
    noteData.cliente_menor = minorCusomer;
    noteData.nota = body.nota;
    noteData.user = user;

    const note = await this.rememberingService.saveNote(noteData);

    return res.status(HttpStatus.OK).json({
      ok: true,
      note
    });
  }

  @Delete(':id')
  public async deleteNoteOrder(@Param() param, @Res() res: Response){

    const note = await this.rememberingService.findNoteById(param.id);

    if (!note){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe esa nota'
      });
    }

    await this.rememberingService.deleteNote(note.id);

    return res.status(HttpStatus.OK).json({
      ok: true,
      note
    })
  }
}
