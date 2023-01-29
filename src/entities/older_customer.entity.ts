import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ventas } from './sale.entit';

@Entity()
export class ClientesMayores{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  NIT: number;

  @Column({nullable: true})
  empresa: string

  @Column()
  telefono_celular: string;

  @Column({default: true})
  is_active: boolean;

  @OneToMany(() => Ventas, (Ventas) => Ventas.cliente_mayor)
  ventas: ClientesMayores[]
}