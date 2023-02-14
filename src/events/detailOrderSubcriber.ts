import { OrderService } from "src/controllers/order/order.service";
import { DetallesPedidos } from "src/entities/detail_order.entity";
import { Disposicion } from "src/entities/disposition.entity";
import { ClientesMenores } from "src/entities/minor_customer.entity";
import { DataSource, EntitySubscriberInterface, EventSubscriber, getConnection, InsertEvent, TransactionStartEvent } from "typeorm";

@EventSubscriber()
export class DetailOrderSubcriber implements EntitySubscriberInterface<DetallesPedidos>{

  constructor(
    dataSource: DataSource,
    private orderService: OrderService
  ){
    dataSource.subscribers.push(this);
  }

  listenTo(): string | Function {
    return DetallesPedidos
  }

  async afterInsert(event: InsertEvent<DetallesPedidos>): Promise<any> {

    // TODO: Investigar como usar el mismo queryRunner en estos eventos, para reutilizar las transicciones y no crear uno nuevo

    // console.log(event.manager.getRepository(DetallesPedidos).update());

    // console.log(event);
    

    // const provision = await this.orderService.findProvisionByUserFinishedProduct(event.entity.pedido.user, event.entity.producto_terminado);

    // console.log(provision);
    // if (!provision){
    //   throw new Error(`El producto ${event.entity.producto_terminado.codigo} no existe en tu mochila`);
    // }
    
    // provision.cantidad = provision.cantidad - event.entity.cantidad;
    
    // if (provision.cantidad < 0){
    //   throw new Error(`No hay suficiente cantidad del producto ${event.entity.producto_terminado.codigo} en tu mochila`);
    // }

    // EventSubscriber

    // // await event.manager.update(Disposicion, provision.id, {cantidad: provision.cantidad});
    // // await event.manager.getRepository(Disposicion).update(provision.id, {cantidad: provision.cantidad});
    // await event.queryRunner.manager.update(Disposicion, provision.id, {cantidad: provision.cantidad});
    
  }

}