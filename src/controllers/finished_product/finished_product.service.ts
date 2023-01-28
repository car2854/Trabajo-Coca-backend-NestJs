import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contienen } from 'src/entities/contain.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class FinishedProductService {

  constructor(
    @InjectRepository(ProductosTerminados)
    private finishedProductRepository: Repository<ProductosTerminados>,

    @InjectRepository(Contienen)
    private containRepository: Repository<Contienen>
  ){}

  public find = (query:string = '') => {
    return this.finishedProductRepository.find({
      where: [
        {is_active: true, codigo: ILike(`%${query}%`)},
        {is_active: true, nombre: ILike(`%${query}%`)}
      ], 
      relations: ['unidad_medida', 'categoria']
    });
  }

  public findByCod = (cod:string) => {
    return this.finishedProductRepository.findOne({where: {codigo: cod, is_active: true}, relations: ['unidad_medida','categoria']});
  }

  public save = (finishedProduct: ProductosTerminados) => {
    return this.finishedProductRepository.save(finishedProduct);
  }

  public update = (id:string, data:any) => {
    return this.finishedProductRepository.update(id, data);
  }

  // Contienen
  public findContain(productCod: ProductosTerminados, wareHouseId: Almacenes){
    // return this.containRepository.findOne({where: {producto_terminado: productCod, almacen: wareHouseId}, relations: ['producto_terminado']})
    return this.containRepository.findOne({where: {producto_terminado: productCod, almacen: wareHouseId}})
  }
}
