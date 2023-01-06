import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class ClientesMenores{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  tipo_negocio: string;

  @Column()
  contacto: string;

  @Column({default: true})
  is_active: boolean

  @ManyToOne(() => Users, (Users) => Users.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

}