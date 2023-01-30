import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private detailNoWareHouseRepository: Repository<DetalleNoAlmacen>
  ){}

  // Ventas

  public find = () => {
    return this.salesRepository.find({relations: ['user', 'cliente_mayor', 'almacen']});
  }

  public save = (sale: Ventas) => {
    return this.salesRepository.save(sale);
  }

  public findOneById = (id:number) => {
    return this.salesRepository.findOne({where: {id: id}, relations: {
      'cliente_mayor' : true,
      'user': true,
      'almacen': true,
      'ventas_productos': {
        'producto_terminado': {
          'categoria': true
        }
      }
    }});
  }

  



  // VentasProductos
  public saveSaleProduct = (saleProduct: VentasProductos) => {
    return this.saleProductRepository.save(saleProduct);
  }

  // Contienen
  public findContain = (wareHouse: Almacenes, finishedProduct: ProductosTerminados) => {
    return this.containRepository.findOne({where: {almacen: wareHouse, producto_terminado: finishedProduct}});
  }

  public updateContain = (id:number, data:any) => {
    return this.containRepository.update(id,data);
  }

  // DetalleNoAlmacen
  public saveDetailNoWareHouse = (detailNoWareHouse: DetalleNoAlmacen) => {
    return this.detailNoWareHouseRepository.save(detailNoWareHouse);
  }

}
