import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { NotasPedidos } from './note_orders_entity';
import { Users } from './users.entity';

@Entity()
export class ClientesMenores{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column()
  tipo_negocio: string;

  @Column()
  contacto: string;

  @Column()
  telefono: number;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  ultima_vez: Date;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha_creacion: Date;

  @Column({default: true})
  is_active: boolean;

  @ManyToOne(() => Users, (Users) => Users.clientes_menores, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => NotasPedidos, (NotasPedidos) => NotasPedidos.cliente_menor)
  notas_pedidos: NotasPedidos[]
}