import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductosTerminados } from './finished_product.entity';

@Entity()
export class UnidadDeMedida{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({default: true})
  is_active: boolean;

  @OneToMany(() => ProductosTerminados, (ProductosTerminados) => ProductosTerminados.unidad_medida)
  productos_terminados: ProductosTerminados[]
}