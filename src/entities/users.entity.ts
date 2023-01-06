import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  is_active: boolean
}