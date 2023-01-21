import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class MinorCustomerService {

  constructor(
    @InjectRepository(ClientesMenores)
    private minorCustomerRepository: Repository<ClientesMenores>
  ){}

  public find = (text:string = '') => {
    return this.minorCustomerRepository.find({
      where: [
        {
          is_active: true,
          nombre: ILike(`%${text}%`),
        },
        {
          is_active: true,
          contacto: ILike(`%${text}%`),
        },
      ],
      relations: ['user']
    });
  }

  public save = (minorCustomer: ClientesMenores) => {
    return this.minorCustomerRepository.save(minorCustomer);
  }

}
