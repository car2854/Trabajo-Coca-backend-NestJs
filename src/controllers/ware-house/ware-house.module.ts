import { Module } from '@nestjs/common';
import { WareHouseService } from './ware-house.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Almacenes } from 'src/entities/ware_house.entity';
import { WareHouseController } from './ware-house.controller';
import { Contienen } from 'src/entities/contain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Almacenes, Contienen])],
  providers: [WareHouseService],
  controllers: [WareHouseController]
})
export class WareHouseModule {}
