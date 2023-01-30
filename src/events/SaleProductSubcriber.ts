import { SalesService } from "src/controllers/sales/sales.service";
import { Contienen } from "src/entities/contain.entity";
import { VentasProductos } from "src/entities/sale_product.entity";
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, TransactionCommitEvent } from "typeorm";

@EventSubscriber()
export class SaleProductSubcriber implements EntitySubscriberInterface<VentasProductos>{

  constructor(
    dataSource: DataSource,
    private salesService: SalesService
  ){
    dataSource.subscribers.push(this);
  }

  listenTo(): string | Function {
    return VentasProductos
  }

  async afterInsert(event: InsertEvent<VentasProductos>): Promise<any> {
    
    const containeProduct = await this.salesService.findContain(event.entity.ventas.almacen, event.entity.producto_terminado);

    if (!containeProduct){

      let error = new Error();
      error.message = `No existe el producto ${event.entity.producto_terminado.codigo} en este almacen`;
      throw error;
    }
    
    if (containeProduct.cantidad - event.entity.cantidad < 0){
      
      throw new Error(`No hay suficiente Stock del producto ${event.entity.producto_terminado.codigo} en el almacen`);
    }

    await event.manager.update(Contienen, {id : containeProduct.id}, {cantidad : containeProduct.cantidad - event.entity.cantidad});

  }

}