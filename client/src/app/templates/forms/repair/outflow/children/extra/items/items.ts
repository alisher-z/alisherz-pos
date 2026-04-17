import { Component, inject, output } from '@angular/core';
import { VirtualTable } from "../../../../../../../elements/virtual-table/virtual-table";
import { VirtualTableList } from "../../../../../../../elements/virtual-table/virtual-table.list";
import { RepairOutflowChildrenTransformer } from '../transformer';

@Component({
  selector: 'repair-outflow-items',
  imports: [VirtualTable, VirtualTableList],
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class RepairOutflowItems {
  transformer = inject(RepairOutflowChildrenTransformer);

  edit = output<any>();

  del(item: any) {
    if (!item) return;

    this.deleteItem(item);
    this.deleteService(item);
  }

  deleteItem(item: any) {
    if (!item.product) return;

    const dels = this.transformer.itemDelsClone;
    dels.push(item.pk);
    this.transformer.bridge.tree().item.deletes!().value.set(dels);

    const items = this.transformer.bridge.itemsClone;
    items.splice(item.vindex, 1);
    this.transformer.bridge.tree().item.saves().value.set(items);
  }

  deleteService(item: any) {
    if (!item.service) return;

    const dels = this.transformer.serviceDelsClone;
    dels.push(item.pk);
    this.transformer.bridge.tree().service.deletes!().value.set(dels);

    const services = this.transformer.bridge.servicesClone;
    services.splice(item.vindex, 1);
    this.transformer.bridge.tree().service.saves().value.set(services);
  }
}
