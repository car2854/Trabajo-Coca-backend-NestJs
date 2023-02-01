import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductosTerminados } from './finished_product.entity';
import { Pedidos } from './order.entity';

@Entity()
export class DetallesPedidos{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column({type: 'float'})
  precio: number;

  @ManyToOne(() => Pedidos, (Pedidos) => Pedidos.detalles_pedidos, { cascade: true })
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedidos;

  @ManyToOne(() => ProductosTerminados, (ProductosTerminados) => ProductosTerminados.codigo, { cascade: true })
  @JoinColumn({ name: 'producto_terminado_codigo' })
  producto_terminado: ProductosTerminados;
}