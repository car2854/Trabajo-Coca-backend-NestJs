import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialContabilidad } from './entities/accounting_history.entity';
import { VentasAnuladas } from './entities/canceled_sale.entity';
import { Categorias } from './entities/category.entity';
import { Contienen } from './entities/contain.entity';
import { DetalleNoAlmacen } from './entities/detail_no_ware_house.entity';
import { DetallesPedidos } from './entities/detail_order.entity';
import { Disposicion } from './entities/disposition.entity';
import { HistorialDisposicion } from './entities/disposition_history.entity';
import { Ingresos } from './entities/entry.entity';
import { IngresosProductos } from './entities/entry_product.entity';
import { ProductosTerminados } from './entities/finished_product.entity';
import { IngresosGastos } from './entities/income_expense.entity';
import { ClientesMenores } from './entities/minor_customer.entity';
import { ClientesMayores } from './entities/older_customer.entity';
import { Pedidos } from './entities/order.entity';
import { Ventas } from './entities/sale.entit';
import { VentasProductos } from './entities/sale_product.entity';
import { UnidadDeMedida } from './entities/unit_of_measuremet.entity';
import { Users } from './entities/users.entity';
import { Almacenes } from './entities/ware_house.entity';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'trabajodev',
      autoLoadEntities: true,
      synchronize: true,
      
      entities: [
        UnidadDeMedida, 
        Categorias, 
        ProductosTerminados, 
        Users, 
        ClientesMenores, 
        Pedidos,
        DetallesPedidos,
        Almacenes,
        Ingresos,
        IngresosProductos,
        Contienen,
        ClientesMayores,
        Ventas,
        DetalleNoAlmacen,
        VentasProductos,
        HistorialContabilidad,
        IngresosGastos,
        Disposicion,
        HistorialDisposicion,
        VentasAnuladas
      ],

    }),
    TypeOrmModule.forFeature([
      UnidadDeMedida, 
      Categorias,
      ProductosTerminados,
      Users,
      ClientesMenores,
      Pedidos,
      DetallesPedidos,
      Almacenes,
      Ingresos,
      IngresosProductos,
      Contienen,
      ClientesMayores,
      Ventas,
      DetalleNoAlmacen,
      VentasProductos,
      HistorialContabilidad,
      IngresosGastos,
      Disposicion,
      HistorialDisposicion,
      VentasAnuladas
    ]),
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
