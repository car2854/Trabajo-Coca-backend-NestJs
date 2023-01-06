import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClientesMenores } from './minor_customer.entity';
import { Users } from './users.entity';

@Entity()
export class Pedidos{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'Sin-asignar'})
  estado: string;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date

  @Column()
  almacen: string;

  @Column({nullable: true, type: 'text'})
  razon_cancelacion: string;

  @ManyToOne(() => ClientesMenores, (ClientesMenores) => ClientesMenores.id, { cascade: true })
  @JoinColumn({ name: 'cliente_menor_id' })
  cliente_menor: ClientesMenores;

  @ManyToOne(() => Users, (Users) => Users.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user_id: Users;
}