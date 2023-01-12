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

  ){}

  // Disposicion
  public find = (user: Users) => {
    return this.dispositionRepository.find(
      {where: {user_id: user},
      relations: ['productos_terminado']
    });
  }

  public findByUserProduct = (user: Users, finishedProduct: ProductosTerminados) => {
    return this.dispositionRepository.findOne({where: {user_id: user, productos_terminado: finishedProduct}});
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


  // Contienen
  public findContainProduct = (finishedProduct: ProductosTerminados, wareHouse: Almacenes) => {
    return this.containRepository.findOne({where: {almacen: wareHouse, producto_terminado:finishedProduct}})
  }
  public toDiscountProductContain = (id:number, amount: number) => {
    return this.containRepository.update(id, {cantidad: amount})
  }
}
