import { JoinColumn ,Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductosTerminados } from './finished_product.entity';
import { Almacenes } from './ware_house.entity';

@Entity()
export class Contienen{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column({default: 999999})
  maximo: number;

  @Column({default: 0})
  minimo: number
  
  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.contienen, {cascade: true})
  @JoinColumn({name: 'almacen_id'})
  almacen: Almacenes;

  @ManyToOne(() => ProductosTerminados, (ProductosTerminados) => ProductosTerminados.contienen, {cascade: true})
  @JoinColumn({name: 'producto_terminado_codigo'})
  producto_terminado: ProductosTerminados
}