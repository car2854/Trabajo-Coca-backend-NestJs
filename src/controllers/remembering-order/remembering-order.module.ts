import { Module } from '@nestjs/common';
import { RememberingOrderService } from './remembering-order.service';
import { RememberingOrderController } from './remembering-order.controller';

@Module({
  providers: [RememberingOrderService],
  controllers: [RememberingOrderController]
})
export class RememberingOrderModule {}
