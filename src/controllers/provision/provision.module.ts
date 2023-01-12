import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvisionController } from './provision.controller';
import { ProvisionService } from './provision.service';
import { Disposicion } from '../../entities/disposition.entity'
import { Users } from 'src/entities/users.entity';
import { UserService } from '../user/user.service';
import { FinishedProductService } from '../finished_product/finished_product.service';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Contienen } from 'src/entities/contain.entity';
import { WareHouseService } from '../ware-house/ware-house.service';
import { Almacenes } from 'src/entities/ware_house.entity';
import { HistorialDisposicion } from 'src/entities/disposition_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disposicion, Users, ProductosTerminados, Contienen, Almacenes, HistorialDisposicion])],
  controllers: [ProvisionController],
  providers: [ProvisionService, UserService, FinishedProductService, WareHouseService]
})
export class ProvisionModule {}
