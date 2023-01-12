import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ValidateTokenMiddleware } from 'src/middlewares/validateToken';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WareHouseModule } from './ware-house/ware-house.module';
import { CategoryModule } from './category/category.module';
import { CategoryController } from './category/category.controller';
import { FinishedProductModule } from './finished_product/finished_product.module';
import { UnitMeasurementModule } from './unit-measurement/unit-measurement.module';
import { UnitMeasurementController } from './unit-measurement/unit-measurement.controller';
import { FinishedProductController } from './finished_product/finished_product.controller';
import { WareHouseController } from './ware-house/ware-house.controller';
import { OlderCustomerModule } from './older-customer/older-customer.module';
import { MinorCustomerModule } from './minor-customer/minor-customer.module';
import { MinorCustomerController } from './minor-customer/minor-customer.controller';
import { OlderCustomerController } from './older-customer/older-customer.controller';
import { IngressModule } from './ingress/ingress.module';
import { IngressController } from './ingress/ingress.controller';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { PublicModule } from './public/public.module';
import { SalesModule } from './sales/sales.module';
import { SalesController } from './sales/sales.controller';
import { ProvisionModule } from './provision/provision.module';
import { ProvisionController } from './provision/provision.controller';

@Module({
  imports: [AuthModule, UserModule, WareHouseModule, CategoryModule, FinishedProductModule, UnitMeasurementModule, OlderCustomerModule, MinorCustomerModule, IngressModule, OrderModule, PublicModule, SalesModule, ProvisionModule]
})
export class ControllersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateTokenMiddleware)
      .forRoutes(
        {path: 'auth/renew', method: RequestMethod.GET},

        {path: 'user', method: RequestMethod.POST},
        {path: 'user', method: RequestMethod.GET},
        {path: 'user/updatePasswordUser/*', method: RequestMethod.PUT},
        {path: 'user/*', method: RequestMethod.DELETE},
        {path: 'user/*', method: RequestMethod.GET},
        {path: 'user/permissions', method: RequestMethod.GET},
        
        CategoryController,
        UnitMeasurementController,
        FinishedProductController,
        WareHouseController,
        MinorCustomerController,
        OlderCustomerController,
        IngressController,
        OrderController,
        SalesController,
        ProvisionController
      )
  }

}
