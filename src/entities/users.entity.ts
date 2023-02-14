import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Disposicion } from './disposition.entity';
import { ClientesMenores } from './minor_customer.entity';
import { Pedidos } from './order.entity';
import { Ventas } from './sale.entit';

@Entity()
export class Users{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({type: 'text'})
  permisos: string;

  @Column({default: true})
  is_active: boolean;

  @OneToMany(() => ClientesMenores, (ClientesMenores) => ClientesMenores.user)
  clientes_menores: ClientesMenores[];

  @OneToMany(() => Disposicion, (Disposicion) => Disposicion.user)
  disposiciones: Disposicion[]

  @OneToMany(() => Ventas, (Ventas) => Ventas.user)
  ventas: Ventas[];

  @OneToMany(() => Pedidos, (Pedidos) => Pedidos.user)
  pedidos: Pedidos[];
  
  @OneToMany(() => Pedidos, (Pedidos) => Pedidos.user)
  notas_pedidos: Pedidos[];

  
}