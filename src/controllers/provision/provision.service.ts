import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contienen } from 'src/entities/contain.entity';
import { Disposicion } from 'src/entities/disposition.entity';
import { HistorialDisposicion } from 'src/entities/disposition_history.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Users } from 'src/entities/users.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvisionService {

  constructor(
    @InjectRepository(Disposicion)
    private dispositionRepository: Repository<Disposicion>,

    @InjectRepository(Contienen)
    private containRepository: Repository<Contienen>,

    @InjectRepository(HistorialDisposicion)
    private historyRepository: Repository<HistorialDisposicion>,

    @InjectRepository(Almacenes)
    private wareHouseRepository: Repository<Almacenes>,

  ){}

  // Disposicion
  public find = (user: Users) => {
    return this.dispositionRepository.find(
      {where: {user: user},
      relations: ['productos_terminado']
    });
  }

  public findById = (id:number) => {
    return this.dispositionRepository.findOne({
      where: {
        id
      },
      relations: {
        'productos_terminado': true
      }
    })
  }

  public findByUserProduct = (user: Users, finishedProduct: ProductosTerminados) => {
    return this.dispositionRepository.findOne({where: {user: user, productos_terminado: finishedProduct}});
  }

  public saveProvition = (disposition: Disposicion) => {
    return this.dispositionRepository.save(disposition);
  }

  public saveHistoryProvition = (historyDisposition: HistorialDisposicion) => {
    return this.historyRepository.save(historyDisposition);
  }
  
  public increaseProvition = (id: number, amount: number) => {
    return this.dispositionRepository.update(id, {cantidad: amount});
  }

  public updateProvision = (id:number, data:any) => {
    return this.dispositionRepository.update(id, data);
  }


  // Contienen
  public findContainProduct = (finishedProduct: ProductosTerminados, wareHouse: Almacenes) => {
    return this.containRepository.findOne({where: {almacen: wareHouse, producto_terminado:finishedProduct}})
  }
  public toDiscountProductContain = (id:number, amount: number) => {
    return this.containRepository.update(id, {cantidad: amount})
  }

  public saveContain = (contain: Contienen) => {
    return this.containRepository.save(contain);
  }

  public updateContain = (id:number, data) => {
    return this.containRepository.update(id, data);
  }
  // Almacen
  public findWareHouseById = (id:number) => {
    return this.wareHouseRepository.findOne({where: {id, is_active: true}});
  }
}
