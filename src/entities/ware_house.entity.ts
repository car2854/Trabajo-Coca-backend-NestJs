import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Contienen } from './contain.entity';

@Entity()
export class Almacenes{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column({default: false})
  es_almacen_padre: boolean;

  @Column({default: true})
  is_active: boolean

  @OneToMany(() => Contienen, (Contienen) => Contienen.almacen_id)
  contienen: Contienen[]
}