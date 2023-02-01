import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RememberingOrderService {

  constructor(
    @InjectRepository(ClientesMenores)
    private minorCustomerRepository: Repository<ClientesMenores>
  ){}

  public findByIdMinorCustomer = (id:number) => {
    return this.minorCustomerRepository.findOne({where: {id, is_active: true}});
  }


}
