import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contienen } from 'src/entities/contain.entity';
import { DetallesPedidos } from 'src/entities/detail_order.entity';
import { Disposicion } from 'src/entities/disposition.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { Pedidos } from 'src/entities/order.entity';
import { Users } from 'src/entities/users.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Between, ILike, Repository } from 'typeorm';

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
    
    @InjectRepository(Contienen)
    private containRepository: Repository<Contienen>,

    @InjectRepository(Disposicion)
    private provisionRepository: Repository<Disposicion>,

  ){}

  // Pedidos
  public findOrder = (type: string = '', clientName: string = '') => {
    return this.orderRepository.find({
      where: {
        estado: ILike(`%${type}%`),
        cliente_menor: {
          nombre: ILike(`%${clientName}%`),
        }
      }, 
      relations: {
        'cliente_menor': true, 
        'user': true, 
        'detalles_pedidos' : {
          'producto_terminado': true
        }
    }});
  }

  public findOrderByMinorCustomer = (minorCustomer: ClientesMenores, from: Date, to: Date, userName: string = '') => {
    return this.orderRepository.find({
      where: {
        cliente_menor: minorCustomer,
        user: {
          'nombre': ILike(`%${userName}%`)
        },
        fecha: Between(from,to)
      },
      relations: {
        cliente_menor: true,
        user: true,
        detalles_pedidos: true
      }
    });
  }

  public findOrderByUserExecutiveBackpack = (user: Users) => {
    return this.orderRepository.find({
      where: {
        user: user,
        estado: 'Mochila'
      },
      relations: {
        cliente_menor: true,
        user: true,
        detalles_pedidos: true
      }
    });
  }

  public findOrderByUserExecutive = (user: Users) => {
    return this.orderRepository.find({
      where: {
        user: user,
        estado: 'Mochila'
      },
      relations: {
        cliente_menor: {
          'user': true
        },
        user: true,
        detalles_pedidos: true
      },
      order: {
        'fecha': 'DESC'
      },
      take: 20
    });
  }

  public findOrderById = (id:number) => {
    return this.orderRepository.findOne({
      where: {
        id: id
      }, 
      relations: {
        'cliente_menor': true, 
        'user': true, 
        'detalles_pedidos' : {
          'producto_terminado': {
            'categoria': true,
            'unidad_medida': true
          }
        },
        'almacen': true
    }});
  }

  public saveOrder = (order: Pedidos) => {
    return this.orderRepository.save(order);
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
    return this.minorCustomerRepository.findOne({
      where :{
        id, 
        is_active: true
      }
    });
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

  // Contienen
  public findContainByFinishedProductAndWareHouse = (finishedProduct: ProductosTerminados, wareHouse: Almacenes) => {
    return this.containRepository.findOne({where: {producto_terminado: finishedProduct, almacen: wareHouse}, relations: {'producto_terminado': true}});
  }

  public updateContain = (id:number, data:any) => {
    return this.containRepository.update(id, data);
  }

  // Disposicion
  public findProvisionByUserFinishedProduct = (user: Users, finishedProduct: ProductosTerminados) => {
    return this.provisionRepository.findOne({
      where: {
        user,
        productos_terminado: finishedProduct
      },
      relations: {
        'productos_terminado': true
      }
    });
  }

  public updateProvision = (id: number, data:any) => {
    return this.provisionRepository.update(id, data);
  }
}
