import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClientesMayores } from './older_customer.entity';

@Entity()
export class TelefonosCelulares{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @ManyToOne(() => ClientesMayores, (ClientesMayores) => ClientesMayores.id, {cascade: true})
  @JoinColumn({name: 'cliente_mayor_id'})
  cliente_mayor_id: ClientesMayores

}