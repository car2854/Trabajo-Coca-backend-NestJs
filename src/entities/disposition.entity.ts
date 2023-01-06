import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductosTerminados } from './finished_product.entity';
import { Users } from './users.entity';

@Entity()
export class Disposicion{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number
  
  @ManyToOne(() => (Users), (Users) => Users.id, {cascade: true})
  @JoinColumn({name: 'user_id'})
  user_id: Users;

  @ManyToOne(() => (ProductosTerminados), (ProductosTerminados) => ProductosTerminados.codigo, {cascade: true})
  @JoinColumn({name: 'producto_terminado_id'})
  producto_terminado_id: ProductosTerminados;
}