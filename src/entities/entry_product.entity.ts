import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ingresos } from './entry.entity';
import { ProductosTerminados } from './finished_product.entity';

@Entity()
export class IngresosProductos{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Ingresos, (Ingresos) => Ingresos.id, { cascade: true })
  @JoinColumn({ name: 'ingreso_id' })
  ingreso: Ingresos;

  @ManyToOne(() => ProductosTerminados, (ProductosTerminados) => ProductosTerminados.codigo, { cascade: true })
  @JoinColumn({ name: 'producto_termindo_codigo' })
  producto_terminado: ProductosTerminados;

}