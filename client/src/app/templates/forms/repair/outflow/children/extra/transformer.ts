import { computed, effect, inject, Injectable, Signal } from "@angular/core";
import { HttpProductSelfZ } from "../../../../../../components/product/self/self.http";
import { HttpServiceDurationZ } from "../../../../../../elements/inputs/duration/duration.http";
import { RepairOutflowChildrenBridge } from "./children.bridge";

@Injectable()
export class RepairOutflowChildrenTransformer {
   constructor() {
      this.#items = computed(this.#getItems);
      this.#itemsGrandTotal = computed(this.#getItemGrandTotal);
      this.#repairsGrandTotal = computed(this.#getReparGrandTotal);
      this.#grandTotal = computed(() => this.itemsGrandTotal + this.repairsGrandTotal);

      effect(this.#setDurationArgs);
   }

   bridge = inject(RepairOutflowChildrenBridge);
   #httpDuration = inject(HttpServiceDurationZ);
   #httpProduct = inject(HttpProductSelfZ);

   #items: Signal<any[]>;
   #itemsGrandTotal: Signal<number>;
   #repairsGrandTotal: Signal<number>;
   #grandTotal: Signal<number>;

   #getItems = () => {
      const items: any[] = this.bridge.itemsClone;
      const products = this.#products;

      for (const item of items) {
         const product = products.get(item.product);
         if (!product) continue;

         item.price = product.price;
         item.product = product.name;
         item.total = this.#getItemTotal(item);
      }

      return items;
   }

   #getItemTotal = ({ price, quantity }: any) => +price * +quantity;
   #getItemGrandTotal = () => this.#items().reduce((sum, { total }) => sum + total, 0);

   #setDurationArgs = () => {
      const repairs: any[] = this.bridge.servicesClone;
      this.#httpDuration.arguments.set(repairs);
   }

   #getReparGrandTotal = () => this.repairs.reduce((sum, { total }) => sum + total, 0);

   get items() {
      return this.#items();
   }

   get itemsGrandTotal() {
      return this.#itemsGrandTotal();
   }

   get repairsGrandTotal() {
      return this.#repairsGrandTotal();
   }

   get grandTotal() {
      return this.#grandTotal();
   }

   get repairs() {
      return this.#httpDuration.durations() ?? [];
   }

   get itemDelsClone() {
      const dels = this.bridge.tree().item.deletes;
      return structuredClone(dels ? dels().value() : []);
   }

   get serviceDelsClone() {
      const dels = this.bridge.tree().service.deletes;
      return structuredClone(dels ? dels().value() : []);
   }

   get #products() {
      return this.#httpProduct.productMap();
   }
}