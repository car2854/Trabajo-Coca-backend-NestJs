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
import { Ventas } from 'src/entities/sale.entit';
import { Users } from 'src/entities/users.entity';
import { UserService } from '../user/user.service';
import { VentasProductos } from 'src/entities/sale_product.entity';
import { SaleProductSubcriber } from 'src/events/SaleProductSubcriber';
import { DetalleNoAlmacen } from 'src/entities/detail_no_ware_house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMayores, Almacenes, Contienen, ProductosTerminados, Ventas, Users, VentasProductos, Contienen, DetalleNoAlmacen])],
  providers: [SalesService, OlderCustomerService, WareHouseService, FinishedProductService, UserService, SaleProductSubcriber],
  controllers: [SalesController]
})
export class SalesModule {}
