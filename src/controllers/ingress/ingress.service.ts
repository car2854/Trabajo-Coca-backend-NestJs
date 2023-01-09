import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contienen } from 'src/entities/contain.entity';
import { Ingresos } from 'src/entities/entry.entity';
import { IngresosProductos } from 'src/entities/entry_product.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngressService {

  constructor(
    @InjectRepository(Ingresos)
    private ingressRepository: Repository<Ingresos>,

    @InjectRepository(IngresosProductos)
    private ingressProductRepository: Repository<IngresosProductos>,

    @InjectRepository(Contienen)
    private containRepository: Repository<Contienen>
  ){}

  public saveIngress = (ingress: Ingresos) => {
    return this.ingressRepository.save(ingress);
  }

  public saveIngressProduct = (ingressProduct: IngresosProductos) => {
    return this.ingressProductRepository.save(ingressProduct);
  }

  public findContain = (finishedProduct: ProductosTerminados, wareHouse: Almacenes) => {
    return this.containRepository.findOne({where: {producto_terminado: finishedProduct, almacen: wareHouse}});
  }

  public saveContain = (contain: Contienen) => {
    return this.containRepository.save(contain);
  }

  public updateContain = (contain: Contienen) => {
    return this.containRepository.update(contain.id, {cantidad: contain.cantidad});
  }

}
