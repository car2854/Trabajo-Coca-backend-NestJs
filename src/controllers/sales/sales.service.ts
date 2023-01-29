import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ventas } from 'src/entities/sale.entit';
import { VentasProductos } from 'src/entities/sale_product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {

  constructor(
    @InjectRepository(Ventas)
    private salesRepository: Repository<Ventas>,

    @InjectRepository(VentasProductos)
    private saleProductRepository: Repository<VentasProductos>
  ){}

  public save = (sale: Ventas) => {
    return this.salesRepository.save(sale);
  }

  public saveSaleProduct = (saleProduct: VentasProductos) => {
    return this.saleProductRepository.save(saleProduct);
  }

}
