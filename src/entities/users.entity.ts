import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Disposicion } from './disposition.entity';

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

  @OneToMany(() => Disposicion, (Disposicion) => Disposicion.user_id)
  disposiciones: Disposicion[]
}