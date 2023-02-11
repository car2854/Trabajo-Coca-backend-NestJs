import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialContabilidad } from 'src/entities/accounting_history.entity';
import { VentasAnuladas } from 'src/entities/canceled_sale.entity';
import { Contienen } from 'src/entities/contain.entity';
import { DetalleNoAlmacen } from 'src/entities/detail_no_ware_house.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Ventas } from 'src/entities/sale.entit';
import { VentasProductos } from 'src/entities/sale_product.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {

  constructor(
    @InjectRepository(Ventas)
    private salesRepository: Repository<Ventas>,

    @InjectRepository(VentasProductos)
    private saleProductRepository: Repository<VentasProductos>,

    @InjectRepository(Contienen)
    private containRepository: Repository<Contienen>,

    @InjectRepository(DetalleNoAlmacen)
    private detailNoWareHouseRepository: Repository<DetalleNoAlmacen>,

    @InjectRepository(HistorialContabilidad)
    private accountingHistoryRepository: Repository<HistorialContabilidad>,
    
    @InjectRepository(VentasAnuladas)
    private cancelesSaleRepository: Repository<VentasAnuladas>,
  ){}

  // Ventas

  public getLength = () => {
    return this.salesRepository.count()
  }

  public find = (skip:number) => {

    console.log(skip);
    

    return this.salesRepository.find({
      relations: ['user', 'cliente_mayor', 'almacen'],
      order: {
        fecha: 'DESC'
      },
      take: 10,
      skip
    });
  }


  public save = (sale: Ventas) => {
    return this.salesRepository.save(sale);
  }

  public findOneById = (id:number) => {
    return this.salesRepository.findOne({where: {id}, relations: {
      'cliente_mayor' : true,
      'user': true,
      'almacen': true,
      'detalles_no_almacen': true,
      'ventas_productos': {
        'producto_terminado': {
          'categoria': true
        }
      },
      'historial_contabilidad': true,
      'venta_anulada': true
    }});
  }

  public delete = (id:number) => {
    return this.salesRepository.update(id, {is_active: false});
  }


  // Ventas anuladas
  public saveCancelesSale = (cancelesSale: VentasAnuladas) => {
    return this.cancelesSaleRepository.save(cancelesSale);
  }


  // VentasProductos
  public saveSaleProduct = (saleProduct: VentasProductos) => {
    return this.saleProductRepository.save(saleProduct);
  }

  // Contienen
  public findContain = (wareHouse: Almacenes, finishedProduct: ProductosTerminados) => {
    return this.containRepository.findOne({
      where: {almacen: wareHouse, producto_terminado: finishedProduct},
      relations: {
        'producto_terminado': true
      }
    });
  }

  public updateContain = (id:number, data:any) => {
    return this.containRepository.update(id,data);
  }

  // DetalleNoAlmacen
  public saveDetailNoWareHouse = (detailNoWareHouse: DetalleNoAlmacen) => {
    return this.detailNoWareHouseRepository.save(detailNoWareHouse);
  }

  // historial contabilidad
  public saveAccountingHistory = (accountingHistory: HistorialContabilidad) => {
    return this.accountingHistoryRepository.save(accountingHistory);
  }

  public findBySaleAccountingHistory = (sale: Ventas) => {
    return this.accountingHistoryRepository.findOne({
      where: {
        venta: sale
      },
    });
  }

  public deleteAccountingHistory = (id:number) => {
    return this.accountingHistoryRepository.delete(id)
  }
}
