import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { NotasPedidos } from 'src/entities/note_orders_entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RememberingOrderService {

  constructor(
    @InjectRepository(ClientesMenores)
    private minorCustomerRepository: Repository<ClientesMenores>,
    
    @InjectRepository(NotasPedidos)
    private noteOrderRepository: Repository<NotasPedidos>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ){}

  // Clientes Menores
  public findByIdMinorCustomer = (id:number) => {
    return this.minorCustomerRepository.findOne({where: {id, is_active: true}});
  }

  // Notas 
  public findNotesByMinorCustomer = (minorCustomer:ClientesMenores) => {
    return this.noteOrderRepository.find({where: {cliente_menor: minorCustomer, is_active: true}});
  }

  public saveNote = (note: NotasPedidos) => {
    return this.noteOrderRepository.save(note);
  }

  public findNoteById = (id:number) => {
    return this.noteOrderRepository.findOne({where: {id, is_active: true}});
  }

  public deleteNote = (id:number) => {
    return this.noteOrderRepository.update(id, {is_active: false});
  }

  // Users
  public findUserById = (id:number) => {
    return this.userRepository.findOne({where: {id, is_active: true}});
  }

}
