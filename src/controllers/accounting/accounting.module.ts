import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialContabilidad } from 'src/entities/accounting_history.entity';
import { Almacenes } from 'src/entities/ware_house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialContabilidad, Almacenes])],
  providers: [AccountingService],
  controllers: [AccountingController]
})
export class AccountingModule {}
