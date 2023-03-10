import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { HistorialContabilidad } from './accounting_history.entity';
import { VentasAnuladas } from './canceled_sale.entity';
import { DetalleNoAlmacen } from './detail_no_ware_house.entity';
import { ClientesMayores } from './older_customer.entity';
import { VentasProductos } from './sale_product.entity';
import { Users } from './users.entity';
import { Almacenes } from './ware_house.entity';

@Entity()
export class Ventas{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  fecha: Date;

  @Column()
  esta_almacen: boolean;

  @Column({type: 'float' ,default: '0'})
  descuento: number;

  @Column({type: 'float'})
  precio_total: number;

  @Column({default: true})
  pagado: boolean;

  @Column({nullable: true, type: 'timestamp'})
  plazo_de_pago: Date;

  @Column({type: 'text', nullable: true})
  nota: string;

  @Column({type: 'timestamp', default: new Date(Date.now())})
  created_at: Date

  @Column({default: true})
  is_active: boolean;

  @ManyToOne(() => Users, (Users) => Users.ventas, {cascade: true})
  @JoinColumn({name: 'user_id'})
  user: Users;
  
  @ManyToOne(() => ClientesMayores, (ClientesMayores) => ClientesMayores.ventas, {cascade: true})
  @JoinColumn({name: 'cliente_mayor_id'})
  cliente_mayor: ClientesMayores;

  @ManyToOne(() => Almacenes, (Almacenes) => Almacenes.ventas, {cascade: true})
  @JoinColumn({name: 'almacen_id'})
  almacen: Almacenes

  @OneToMany(() => VentasProductos, (VentasProductos) => VentasProductos.ventas)
  ventas_productos: VentasProductos[]

  @OneToMany(() => DetalleNoAlmacen, (DetalleNoAlmacen) => DetalleNoAlmacen.venta)
  detalles_no_almacen: DetalleNoAlmacen[];

  @OneToOne(() => HistorialContabilidad, (HistorialContabilidad) => HistorialContabilidad.venta)
  historial_contabilidad: HistorialContabilidad;

  @OneToOne(() => VentasAnuladas, (VentasAnuladas) => VentasAnuladas.venta)
  venta_anulada: VentasAnuladas
}