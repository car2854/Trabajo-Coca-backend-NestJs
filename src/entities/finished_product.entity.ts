import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categorias } from './category.entity';
import { Contienen } from './contain.entity';
import { UnidadDeMedida } from './unit_of_measuremet.entity';

@Entity()
export class ProductosTerminados{
  @PrimaryColumn()
  codigo: string;

  @Column()
  nombre: string;

  @Column({type: 'float'})
  precio: number

  @Column({default: true})
  is_active: boolean

  @ManyToOne(() => UnidadDeMedida, (UnidadDeMedida) => UnidadDeMedida.productos_terminados, { cascade: true })
  @JoinColumn({ name: 'unidad_medida_id' })
  unidad_medida: UnidadDeMedida;

  @ManyToOne(() => Categorias, (Categorias) => Categorias.productosTerminados, { cascade: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categorias;

  @OneToMany(() => Contienen, (Contienen) => Contienen.productos_terminados_codigo)
  contienen: Contienen[]
}