import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedidos } from 'src/entities/order.entity';
import { DetallesPedidos } from 'src/entities/detail_order.entity';
import { Users } from 'src/entities/users.entity';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Contienen } from 'src/entities/contain.entity';
import { Disposicion } from 'src/entities/disposition.entity';
import { DetailOrderSubcriber } from 'src/events/detailOrderSubcriber';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMenores, Pedidos, DetallesPedidos, Users, ProductosTerminados, Almacenes, Contienen, Disposicion])],
  providers: [OrderService, DetailOrderSubcriber],
  controllers: [OrderController]
})
export class OrderModule {}
