import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientesMenores } from './minor_customer.entity';
import { Users } from './users.entity';

@Entity()
export class NotasPedidos{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nota: string;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  created_at: Date;

  @Column({type: 'bool', default: true})
  is_active: boolean;

  @ManyToOne(() => ClientesMenores, (ClientesMenores) => ClientesMenores.notas_pedidos, {cascade: true, nullable: false})
  @JoinColumn({name: 'cliente_menor_id'})
  cliente_menor: ClientesMenores;

  @ManyToOne(() => Users, (Users) => Users.notas_pedidos, {cascade: true, nullable: false})
  @JoinColumn({name: 'user_id'})
  user: Users
}