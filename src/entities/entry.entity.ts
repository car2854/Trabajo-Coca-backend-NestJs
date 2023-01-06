import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Almacenes } from './ware_house.entity';

@Entity()
export class Ingresos{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date;

  @Column({type: 'text'})
  nota: string;

  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.id, { cascade: true })
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacenes;
} 