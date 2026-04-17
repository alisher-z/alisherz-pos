import { computed, Injectable, InputSignal } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";
import { RepairOutflowType } from "../../../../../../types/form/repair-outflow";

@Injectable()
export class RepairOutflowChildrenBridge {
   tree!: InputSignal<FieldTree<RepairOutflowType>>;

   itemIndex: number = -1;
   serviceIndex: number = -1;

   outflowPK = computed(() => this.tree().pk().value());

   upsertService(service: any) {
      const services = this.servicesClone;

      this.serviceIndex >= 0
         ? services[this.serviceIndex] = service
         : services.push(service);

      this.tree().service.saves().value.set(services);
   }

   upsertItem(item: any) {
      const items = this.itemsClone;

      this.itemIndex >= 0
         ? items[this.itemIndex] = item
         : items.push(item);

      this.tree().item.saves().value.set(items);
   }

   get itemsClone() {
      return structuredClone(
         this.tree().item.saves().value()
      );
   }

   get servicesClone() {
      return structuredClone(
         this.tree().service.saves().value()
      );
   }

   get items() {
      return this.tree().item.saves().value();
   }

   get services() {
      return this.tree().service.saves().value();
   }
}