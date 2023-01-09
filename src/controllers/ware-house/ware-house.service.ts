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

  public findOneById = (id:number) => {
    return this.wareHouseRepository.findOne({where: {id, is_active: true}});
  }
  
  public findFather = () => {
    return this.wareHouseRepository.findOne({where: {is_active: true, es_almacen_padre: true}});
  }

  public save = (wareHouse: Almacenes) => {
    return this.wareHouseRepository.save(wareHouse);
  }

  public findContain = (wareHouse:Almacenes, id_category:number = -1) => {
    if (id_category > 0){
      return this.containsRepository.find({
        where: {
          almacen: wareHouse,
          producto_terminado: {
            categoria: {
              id: id_category
            }
          }
        }, 
        relations: {
          producto_terminado: {
            categoria: true,
            unidad_medida: true
          },
        },
        
      });
    }

    return this.containsRepository.find({
      where: {
        almacen: wareHouse,
      }, 
      relations: {
        producto_terminado: {
          categoria: true,
          unidad_medida: true
        },
      },
      
    });
  }

  public update = () => {
  }
}
