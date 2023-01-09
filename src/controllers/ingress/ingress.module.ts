import { Module } from '@nestjs/common';
import { IngressService } from './ingress.service';
import { IngressController } from './ingress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingresos } from 'src/entities/entry.entity';
import { WareHouseService } from '../ware-house/ware-house.service';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Contienen } from 'src/entities/contain.entity';
import { IngresosProductos } from 'src/entities/entry_product.entity';
import { FinishedProductService } from '../finished_product/finished_product.service';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { IngressProductSubcriber } from 'src/events/IngressProductSubcriber';

@Module({
  imports: [TypeOrmModule.forFeature([Ingresos, Almacenes, Contienen, IngresosProductos, ProductosTerminados])],
  providers: [IngressService, WareHouseService, FinishedProductService, IngressProductSubcriber],
  controllers: [IngressController]
})
export class IngressModule {}
