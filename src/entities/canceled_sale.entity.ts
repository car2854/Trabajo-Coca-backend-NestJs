import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
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

  @OneToOne(() => Ventas, (Ventas) => Ventas.venta_anulada, {cascade: true, nullable: true})
  @JoinColumn({name: 'venta_id'})
  venta: Ventas
  
}