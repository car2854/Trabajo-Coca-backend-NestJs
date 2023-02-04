import { Module } from '@nestjs/common';
import { RememberingOrderService } from './remembering-order.service';
import { RememberingOrderController } from './remembering-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';
import { NotasPedidos } from 'src/entities/note_orders_entity';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMenores, NotasPedidos, Users])],
  providers: [RememberingOrderService],
  controllers: [RememberingOrderController]
})
export class RememberingOrderModule {}
