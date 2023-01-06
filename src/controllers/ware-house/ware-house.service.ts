import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contienen } from 'src/entities/contain.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class WareHouseService {

  constructor(
    @InjectRepository(Almacenes)
    private wareHouseRepository: Repository<Almacenes>,

    @InjectRepository(Contienen)
    private containsRepository: Repository<Contienen>
  ){}

  public find = (text:string = '') => {
    return this.wareHouseRepository.find({
      where: [
        {
          is_active: true, 
          nombre: ILike(`%${text}%`),
        },
        {
          is_active: true,
          direccion: ILike(`%${text}%`)
        }
      ]
    });
  }

  public findOne = (id:number) => {
    return this.wareHouseRepository.findOne({where: {id, is_active: true}});
  }
  
  public findFather = () => {
    return this.wareHouseRepository.findOne({where: {is_active: true, es_almacen_padre: true}});
  }

  public save = (wareHouse: Almacenes) => {
    return this.wareHouseRepository.save(wareHouse);
  }

  public findContain = (wareHouse:Almacenes) => {
    return this.containsRepository.find({where: {almacen_id: wareHouse}, relations: ['productos_terminados_codigo']});
  }

  public update = () => {
  }
}
