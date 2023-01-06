import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ventas } from './sale.entit';

@Entity()
export class VentasAnuladas{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  descripcion: string;

  @Column()
  items_devueltos: boolean;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha_anulada: Date;

  @ManyToOne(() => Ventas, (Ventas) => Ventas.id, {cascade: true})
  @JoinColumn({name: 'venta_id'})
  venta_id: Ventas
  
}