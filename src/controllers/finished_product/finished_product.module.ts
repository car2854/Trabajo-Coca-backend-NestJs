import { Module } from '@nestjs/common';
import { FinishedProductService } from './finished_product.service';
import { FinishedProductController } from './finished_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosTerminados } from 'src/entities/finished_product.entity';
import { Categorias } from 'src/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { UnidadDeMedida } from 'src/entities/unit_of_measuremet.entity';
import { UnitMeasurementService } from '../unit-measurement/unit-measurement.service';
import { Contienen } from 'src/entities/contain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductosTerminados, Categorias, UnidadDeMedida, Contienen])],
  providers: [FinishedProductService, CategoryService, UnitMeasurementService],
  controllers: [FinishedProductController]
})
export class FinishedProductModule {}
