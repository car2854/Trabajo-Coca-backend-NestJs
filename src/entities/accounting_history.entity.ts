import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { IngresosGastos } from './income_expense.entity';
import { Ventas } from './sale.entit';
import { Almacenes } from './ware_house.entity';

@Entity()
export class HistorialContabilidad{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  detalle: string;

  @Column({type: 'float', nullable: true})
  ingreso: number;

  @Column({type: 'float', nullable: true})
  egreso: number;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date;

  @Column({default: true})
  is_active: boolean;

  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.historial_contabilidad, {cascade: true})
  @JoinColumn({name: 'almacen_id'})
  almacen: Almacenes;
  
  @OneToOne(() => Ventas, (Ventas) => Ventas.historial_contabilidad, {cascade:true, nullable: true})
  @JoinColumn({name: 'venta_id'})
  venta: Ventas;
  
  @OneToOne(() => IngresosGastos, (IngresosGastos) => IngresosGastos.historial_contabilidad, {cascade: true, nullable: true})
  @JoinColumn({name: 'ingreso_gasto_id'})
  ingreso_gasto: IngresosGastos;
}