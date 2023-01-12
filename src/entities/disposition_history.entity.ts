import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Disposicion } from './disposition.entity';
import { Almacenes } from './ware_house.entity';

@Entity()
export class HistorialDisposicion{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date;

  @Column()
  cantidad: number;

  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.id, {cascade: true})
  @JoinColumn({name: 'almacen_id'})
  almacen_id: Almacenes;

  @ManyToOne(() => Disposicion, (Disposicion) => Disposicion.historial_disposiciones, {cascade: true})
  @JoinColumn({name: 'disposicion_id'})
  disposicion_id: Disposicion
}