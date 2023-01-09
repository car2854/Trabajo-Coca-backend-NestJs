import { IngressService } from "src/controllers/ingress/ingress.service";
import { Contienen } from "src/entities/contain.entity";
import { IngresosProductos } from "src/entities/entry_product.entity";
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class IngressProductSubcriber implements EntitySubscriberInterface<IngresosProductos>{

  constructor(
    dataSource: DataSource,
    private ingressService: IngressService
  ){
    dataSource.subscribers.push(this);
  }

  listenTo(): string | Function {
    return IngresosProductos
  }

  // despues de que IngresoProductoTerminado cree sus datos, un trigger
  async afterInsert(event: InsertEvent<IngresosProductos>): Promise<any> {

    const contain = await this.ingressService.findContain(event.entity.producto_terminado, event.entity.ingreso.almacen);

    if (!contain){
      const newContains = new Contienen();
      newContains.almacen = event.entity.ingreso.almacen;
      newContains.cantidad = event.entity.cantidad;
      newContains.producto_terminado = event.entity.producto_terminado;
      await this.ingressService.saveContain(newContains);
    }else{
      contain.cantidad = contain.cantidad + event.entity.cantidad;
      await this.ingressService.updateContain(contain);
    }

  }

}