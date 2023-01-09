import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IngresosProductos } from './entry_product.entity';
import { Almacenes } from './ware_house.entity';

@Entity()
export class Ingresos{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date;

  @Column({type: 'text'})
  nota: string;

  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.ingresos, { cascade: true })
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacenes;

  @OneToMany(() => IngresosProductos, (IngresosProductos) => IngresosProductos.ingreso)
  ingresos_productos: IngresosProductos[]
} 