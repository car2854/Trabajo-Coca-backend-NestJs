import { Module } from '@nestjs/common';
import { UnitMeasurementService } from './unit-measurement.service';
import { UnitMeasurementController } from './unit-measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadDeMedida } from 'src/entities/unit_of_measuremet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadDeMedida])],
  providers: [UnitMeasurementService],
  controllers: [UnitMeasurementController]
})
export class UnitMeasurementModule {}
