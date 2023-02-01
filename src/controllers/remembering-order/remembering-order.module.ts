import { Module } from '@nestjs/common';
import { RememberingOrderService } from './remembering-order.service';
import { RememberingOrderController } from './remembering-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesMenores } from 'src/entities/minor_customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientesMenores])],
  providers: [RememberingOrderService],
  controllers: [RememberingOrderController]
})
export class RememberingOrderModule {}
