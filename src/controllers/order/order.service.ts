import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesPedidos } from 'src/entities/detail_order.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { Pedidos } from 'src/entities/order.entity';
import { Users } from 'src/entities/users.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
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
    
    @InjectRepository(Almacenes)
    private wareHouseRepository: Repository<Almacenes>,

  ){}

  public findOrder(){
    return this.orderRepository.find({where: {}, relations: {
      'cliente_menor': true, 
      'user': true, 
      'detalles_pedidos' : {
        'producto_terminado': true
      }
    }});
  }

  // Pedidos
  public saveOrder = (order: Pedidos) => {
    return this.orderRepository.save(order);
  }

  public findOrderById = (id:number) => {
    return this.orderRepository.findOne({where: {id}});
  }

  public updateOrder = (id:number, data:any) => {
    return this.orderRepository.update(id, data);
  }

  // Detalle pedidos
  public saveDetailOrder = (detailOrder: DetallesPedidos) => {
    return this.detailOrderRepository.save(detailOrder);
  }

  // Clientes menores
  public findByIdMinorCustomer = (id:number) => {
    return this.minorCustomerRepository.findOne({where :{id, is_active: true}});
  }

  // Users
  public findByIdUser = (id:number) => {
    return this.userRepository.findOne({where: {id, is_active: true}});
  }

  // Productos terminados
  public findByCodFinishedProduct = (cod:string) => {
    return this.finishedProductRepository.findOne({where: {codigo: cod, is_active: true}});
  }

  // Almacenes
  public findByIdWareHouse = (id:number) => {
    return this.wareHouseRepository.findOne({where: {id, is_active: true}});
  }
}
