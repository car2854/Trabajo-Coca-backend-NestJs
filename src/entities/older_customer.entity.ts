import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({default: true})
  is_active: boolean
}