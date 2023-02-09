import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { HistorialContabilidad } from './accounting_history.entity';
import { Almacenes } from './ware_house.entity';

@Entity()
export class IngresosGastos{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date;

  @Column({type: 'text'})
  detalle: string;

  @Column({type: 'float'})
  monto: number;

  @Column()
  tipo: string;

  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.ingresos_gastos, {cascade: true})
  @JoinColumn({name: 'almacen_id'})
  almacen: Almacenes;

  @OneToOne(() => HistorialContabilidad, (HistorialContabilidad) => HistorialContabilidad.ingreso_gasto)
  historial_contabilidad: HistorialContabilidad;
}