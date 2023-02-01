import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesPedidos } from 'src/entities/detail_order.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { Pedidos } from 'src/entities/order.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(ClientesMenores)
    private minorCustomerRepository: Repository<ClientesMenores>,
    
    @InjectRepository(Pedidos)
    private orderRepository: Repository<Pedidos>,
    
    @InjectRepository(DetallesPedidos)
    private detailOrderRepository: Repository<DetallesPedidos>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(ProductosTerminados)
    private finishedProductRepository: Repository<ProductosTerminados>,

  ){}

  public findByIdMinorCustomer(id:number){
    return this.minorCustomerRepository.findOne({where :{id, is_active: true}});
  }

  public saveOrder(order: Pedidos){
    return this.orderRepository.save(order);
  }

  public saveDetailOrder(detailOrder: DetallesPedidos){
    return this.detailOrderRepository.save(detailOrder);
  }

  public findByIdUser = (id:number) => {
    return this.userRepository.findOne({where:{id, is_active: true}});
  }

  public findByCodFinishedProduct = (cod:string) => {
    return this.finishedProductRepository.find({where: {codigo: cod, is_active: true}});
  }
}
