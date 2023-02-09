import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialContabilidad } from 'src/entities/accounting_history.entity';
import { IngresosGastos } from 'src/entities/income_expense.entity';
import { Almacenes } from 'src/entities/ware_house.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoneyService {

  constructor(
    @InjectRepository(Almacenes)
    private wareHouseRepository: Repository<Almacenes>,

    @InjectRepository(IngresosGastos)
    private incomeExpensesRepository: Repository<IngresosGastos>,
    
    @InjectRepository(HistorialContabilidad)
    private accountingHistoryRepository: Repository<HistorialContabilidad>,
  ){}


  // Almacen
  public findByIdWareHouse = (id:number) => {
    return this.wareHouseRepository.findOne({
      where: {
        id,
        is_active: true
      }
    });
  }

  // Ingresos gastos
  public saveIncomeExpenses = (incomeExpense: IngresosGastos) => {
    return this.incomeExpensesRepository.save(incomeExpense);
  }

  public findByIdIncomeExpenses = (id: number) => {
    return this.incomeExpensesRepository.findOne({
      where: {
        id
      }
    })
  }

  public deleteIncomeExpenses = (id:number) => {
    return this.incomeExpensesRepository.delete(id)
  }

  public updateIncomeExpenses = (id:number, data:any) => {
    return this.incomeExpensesRepository.update(id, data);
  }

  // historial contabilidad
  public saveAccountingHistory = (accountingHistory: HistorialContabilidad) => {
    return this.accountingHistoryRepository.save(accountingHistory);
  }

  public findAccountingHistory = () => {
    return this.accountingHistoryRepository.find({
      where: {
        is_active: true
      },
      order: {
        fecha: 'ASC'
      },
      relations:{
        'almacen': true,
        'ingreso_gasto': true,
        'venta': true
      }
    });
  }

  public findByIdAccountingHistory = (id: number) => {
    return this.accountingHistoryRepository.findOne({
      where: {
        id
      }
    })
  }

  public deleteAccountingHistory = (id:number) => {
    return this.accountingHistoryRepository.delete(id)
  }

  public updateAccountingHistory = (id:number, data:any) => {
    return this.accountingHistoryRepository.update(id, data)
  }

}
