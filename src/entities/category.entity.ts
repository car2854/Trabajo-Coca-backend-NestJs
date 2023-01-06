import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductosTerminados } from './finished_product.entity';

@Entity()
export class Categorias{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  sabor: string;

  @Column({default: true})
  is_active: boolean

  @OneToMany(() => ProductosTerminados, (ProductosTerminados) => ProductosTerminados.categoria)
  productosTerminados: ProductosTerminados[]

}