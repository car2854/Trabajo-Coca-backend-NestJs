import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ventas } from './sale.entit';

@Entity()
export class DetalleNoAlmacen{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  cantidad: number;

  @Column({type: 'float'})
  precio_individual: number;

  @Column({type: 'float'})
  precio_total: number;

  @ManyToOne(() => Ventas, (Ventas) => Ventas.detalles_no_almacen, {cascade: true})
  @JoinColumn({name: 'venta_id'})
  venta: Ventas;

}