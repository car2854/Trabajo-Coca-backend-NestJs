import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductosTerminados } from './finished_product.entity';
import { Ventas } from './sale.entit';

@Entity()
export class VentasProductos{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'float'})
  precio_individual: number;

  @Column({type: 'float'})
  precio_total: number;

  @ManyToOne(() => ProductosTerminados, (ProductosTerminados) => ProductosTerminados.codigo, {cascade: true})
  @JoinColumn({name: 'producto_terminado_codigo'})
  producto_terminado_codigo: ProductosTerminados;

  @ManyToOne(() => Ventas, (Ventas) => Ventas.id, {cascade: true})
  @JoinColumn({name: 'ventas_id'})
  ventas_id: Ventas;

}