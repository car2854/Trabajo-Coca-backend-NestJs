import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class FinishedProductService {

  constructor(
    @InjectRepository(ProductosTerminados)
    private finishedProductRepository: Repository<ProductosTerminados>
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
}
