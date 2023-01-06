import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Almacenes } from './ware_house.entity';

@Entity()
export class HistorialContabilidad{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  detalle: string;

  @Column({type: 'float', nullable: true})
  ingreso: number;

  @Column({type: 'float', nullable: true})
  egreso: number;

  @Column()
  id_referencia: number;

  @Column()
  tabla: string;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date;

  @Column({default: true})
  is_active: boolean;

  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.id, {cascade: true})
  @JoinColumn({name: 'almacen_id'})
  almacen_id: Almacenes
  
}