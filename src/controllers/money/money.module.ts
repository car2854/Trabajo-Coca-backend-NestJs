import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialContabilidad } from 'src/entities/accounting_history.entity';
import { IngresosGastos } from 'src/entities/income_expense.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { MoneyController } from './money.controller';
import { MoneyService } from './money.service';

@Module({
  imports: [TypeOrmModule.forFeature([Almacenes, IngresosGastos, HistorialContabilidad])],
  controllers: [MoneyController],
  providers: [MoneyService]
})
export class MoneyModule {}
