import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { HistorialDisposicion } from './disposition_history.entity';
import { ProductosTerminados } from './finished_product.entity';
import { Users } from './users.entity';

@Entity()
export class Disposicion{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number
  
  @ManyToOne(() => (Users), (Users) => Users.disposiciones, {cascade: true})
  @JoinColumn({name: 'user_id'})
  user: Users;

  @ManyToOne(() => ProductosTerminados, (ProductosTerminados) => ProductosTerminados.disposiciones, {cascade: true})
  @JoinColumn({name: 'producto_terminado_id'})
  productos_terminado: ProductosTerminados;

  @OneToMany(() => HistorialDisposicion, (HistorialDisposicion) => HistorialDisposicion.disposicion_id)
  historial_disposiciones: HistorialDisposicion[]
}