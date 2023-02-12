import { Controller, Get, Post, Put, Delete, Query, Param, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { HistorialContabilidad } from 'src/entities/accounting_history.entity';
import { IngresosGastos } from 'src/entities/income_expense.entity';
import { CreateMoneyValidator } from 'src/validators/create-money-validator';
import { UpdateMoneyValidator } from 'src/validators/update-money-validator';
import { MoneyService } from './money.service';

@Controller('money')
export class MoneyController {

  constructor(
    private moneyService: MoneyService
  ){}

  @Post()
  public async saveMoney(@Body() body: CreateMoneyValidator, @Res() res: Response){

    
    const wareHouse = await this.moneyService.findByIdWareHouse(body.idAlmacen);

    if (!wareHouse){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese almacen'
      });
    }

    const incomeExpenseData = new IngresosGastos();
    incomeExpenseData.almacen = wareHouse;
    incomeExpenseData.detalle = body.detalle;
    incomeExpenseData.fecha = body.fecha;
    incomeExpenseData.monto = body.monto;
    incomeExpenseData.tipo = body.tipo;

    const incomeExpense = await this.moneyService.saveIncomeExpenses(incomeExpenseData);

    const accountingHistoryData = new HistorialContabilidad();
    accountingHistoryData.almacen = wareHouse;
    accountingHistoryData.detalle = incomeExpense.detalle;
    accountingHistoryData.fecha = body.fecha;
    accountingHistoryData.ingreso_gasto = incomeExpense;
    if (body.tipo === 'ingreso'){
      accountingHistoryData.ingreso = incomeExpense.monto;
    }else{
      accountingHistoryData.egreso = incomeExpense.monto;
    }

    const accountingHistory = await this.moneyService.saveAccountingHistory(accountingHistoryData);

    const accountingHistories = await this.moneyService.findAccountingHistory();

    return res.status(HttpStatus.OK).json({
      ok: true,
      msg: accountingHistories
    });
    
  }

  @Delete(':income_expense/:accounting_history')
  public async deleteHistory(@Param() param, @Res() res: Response){

    const [incomeExpense, accountingHistory] = await Promise.all([
      this.moneyService.findByIdIncomeExpenses(param.income_expense),
      this.moneyService.findByIdAccountingHistory(param.accounting_history)
    ]); 

    if (!incomeExpense){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese ingreso_gasto'
      });
    }

    if (!accountingHistory){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe esa historial'
      });
    }

    await this.moneyService.deleteAccountingHistory(accountingHistory.id);
    await this.moneyService.deleteIncomeExpenses(incomeExpense.id);
    
    return res.status(HttpStatus.OK).json({
      ok: true,
      incomeExpense,
      accountingHistory
    })

  }

  @Put(':income_expense/:accounting_history')
  public async updateHistory(@Param() param, @Body() body: UpdateMoneyValidator, @Res() res: Response){

    const [incomeExpense, accountingHistory] = await Promise.all([
      this.moneyService.findByIdIncomeExpenses(param.income_expense),
      this.moneyService.findByIdAccountingHistory(param.accounting_history)
    ]); 

    if (!incomeExpense){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe ese ingreso_gasto'
      });
    }

    if (!accountingHistory){
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        msg: 'No existe esa historial'
      });
    }
    
    incomeExpense.detalle = body.detalle;
    incomeExpense.monto = body.monto;
    incomeExpense.fecha = body.fecha;
    
    console.log(incomeExpense);
    
    if (incomeExpense.tipo === 'ingreso'){
      accountingHistory.ingreso = body.monto;
    }else{
      accountingHistory.egreso = body.monto;
    }
    accountingHistory.detalle = body.detalle;
    accountingHistory.fecha = body.fecha;
    

    await this.moneyService.updateAccountingHistory(accountingHistory.id, accountingHistory);
    await this.moneyService.updateIncomeExpenses(incomeExpense.id, incomeExpense);

    return res.status(HttpStatus.OK).json({
      ok: true,
      incomeExpense,
      accountingHistory
    })

  }
}
