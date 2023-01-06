import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ValidateTokenMiddleware } from 'src/middlewares/validateToken';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WareHouseModule } from './ware-house/ware-house.module';
import { CategoryModule } from './category/category.module';
import { CategoryController } from './category/category.controller';
import { UserController } from './user/user.controller';
import { FinishedProductModule } from './finished_product/finished_product.module';
import { UnitMeasurementModule } from './unit-measurement/unit-measurement.module';
import { UnitMeasurementController } from './unit-measurement/unit-measurement.controller';
import { FinishedProductController } from './finished_product/finished_product.controller';
import { WareHouseController } from './ware-house/ware-house.controller';

@Module({
  imports: [AuthModule, UserModule, WareHouseModule, CategoryModule, FinishedProductModule, UnitMeasurementModule]
})
export class ControllersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateTokenMiddleware)
      .forRoutes(
        {path: 'auth/renew', method: RequestMethod.GET},
        CategoryController,
        UserController,
        UnitMeasurementController,
        FinishedProductController,
        WareHouseController
      )
  }

}
