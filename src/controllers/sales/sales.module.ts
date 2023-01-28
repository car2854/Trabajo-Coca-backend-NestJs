import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ClientesMayores } from 'src/entities/older_customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OlderCustomerService } from '../older-customer/older-customer.service';
import { Almacenes } from 'src/entities/ware_house.entity';
import { WareHouseService } from '../ware-house/ware-house.service';
import { Contienen } from 'src/entities/contain.entity';
import { FinishedProductService } from '../finished_product/finished_product.service';
import { ProductosTerminados } from 'src/entities/finished_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMayores, Almacenes, Contienen, ProductosTerminados])],
  providers: [SalesService, OlderCustomerService, WareHouseService, FinishedProductService],
  controllers: [SalesController]
})
export class SalesModule {}
