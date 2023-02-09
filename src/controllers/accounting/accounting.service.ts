import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialContabilidad } from 'src/entities/accounting_history.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountingService {

  constructor(
    @InjectRepository(HistorialContabilidad)
    private accountingRepository: Repository<HistorialContabilidad>,

    @InjectRepository(Almacenes)
    private wareHouseRepository: Repository<Almacenes>
  ){}

  // Historial contabilidad
  public findAccountingByWareHouse = (wareHouse: Almacenes) => {
    return this.accountingRepository.find({
      where: {
        'almacen': wareHouse,
        is_active: true
      },
      order: {
        fecha: 'ASC'
      },
      relations:{
        'almacen': true,
        'ingreso_gasto': true,
        'venta': true
      }
    });
  }

  // Almacen
  public findWareHouseById = (id:number) => {
    return this.wareHouseRepository.findOne({
      where: {
        id,
        is_active: true
      }
    });
  }
}
