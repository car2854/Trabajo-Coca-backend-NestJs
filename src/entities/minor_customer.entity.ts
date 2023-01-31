import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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


  @ManyToOne(() => Users, (Users) => Users.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

}