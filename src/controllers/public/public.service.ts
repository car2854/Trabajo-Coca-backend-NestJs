import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicService {

  constructor(
    @InjectRepository(ClientesMenores)
    private minorCustomerRepository: Repository<ClientesMenores>
  ){}

  public find = () => {
    return this.minorCustomerRepository.find({where: {is_active: true}});
  }

}
