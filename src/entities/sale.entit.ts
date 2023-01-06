import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClientesMayores } from './older_customer.entity';
import { Users } from './users.entity';

@Entity()
export class Ventas{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date;

  @Column()
  esta_almcen: boolean;

  @Column({type: 'float' ,default: '0'})
  descuento: number;

  @Column({type: 'float'})
  precio_total: number;

  @Column({default: true})
  pagado: boolean;

  @Column({nullable: true, type: 'timestamp'})
  plazo_de_pago: Date;

  @Column({type: 'text', nullable: true})
  nota: string;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  created_at: Date

  @Column({default: true})
  is_active: boolean;

  @ManyToOne(() => Users, (Users) => Users.id, {cascade: true})
  @JoinColumn({name: 'user_id'})
  user_id: Users;
  
  @ManyToOne(() => ClientesMayores, (ClientesMayores) => ClientesMayores.id, {cascade: true})
  @JoinColumn({name: 'cliente_mayor_id'})
  cliente_mayor_id: ClientesMayores;

}