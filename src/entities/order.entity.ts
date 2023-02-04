import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DetallesPedidos } from './detail_order.entity';
import { ClientesMenores } from './minor_customer.entity';
import { Users } from './users.entity';
import { Almacenes } from './ware_house.entity';

@Entity()
export class Pedidos{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'Sin-asignar'})
  estado: string;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date
  
  @Column({nullable: true, type: 'text'})
  razon_cancelacion: string;
  
  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.pedidos, {nullable: true})
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacenes;

  @ManyToOne(() => ClientesMenores, (ClientesMenores) => ClientesMenores.id, { cascade: true })
  @JoinColumn({ name: 'cliente_menor_id' })
  cliente_menor: ClientesMenores;

  @ManyToOne(() => Users, (Users) => Users.pedidos, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => DetallesPedidos, (DetallesPedidos) => DetallesPedidos.pedido)
  detalles_pedidos: DetallesPedidos[]
}