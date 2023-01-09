import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesMayores } from 'src/entities/older_customer.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class OlderCustomerService {

  constructor(
    @InjectRepository(ClientesMayores)
    private olderCustomerRepostory: Repository<ClientesMayores>
  ){}

  public find = (text:string = '') => {
    return this.olderCustomerRepostory.find({
      where: [
        {is_active: true, nombre: ILike(`%${text}%`)},
        {is_active: true, apellido: ILike(`%${text}%`)},
      ]
    })
  }

  public findById = (id:number) => {
    return this.olderCustomerRepostory.findOne({
      where: {
        is_active: true,
        id
      }
    });
  }

  public update = (id:number, data:any) => {
    return this.olderCustomerRepostory.update(id, data);
  }

  public save = (olderCustomer:ClientesMayores) => {
    return this.olderCustomerRepostory.save(olderCustomer);
  }

  public delete = (id:number) => {
    return this.olderCustomerRepostory.update(id, {is_active: false});
  }


}
