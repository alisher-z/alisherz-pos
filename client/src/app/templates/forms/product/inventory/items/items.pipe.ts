import { Pipe, PipeTransform } from "@angular/core";
import { ProductInventoryItemTypeExt } from "../../../../../types/form/product-inventory-item";

@Pipe({ name: 'inventory_items' })
export class InventoryItemsPipe implements PipeTransform {

   transform(items: ProductInventoryItemTypeExt[], products: Map<string, any>): { total: number, items: any[] } | null {
      const _items: any[] = [];

      for (const i of items) {
         const item: any = structuredClone(i.item);
         const product = i?.product?.product ?? products.get(item.product);
         if (!product) continue;

         item.product = product.name;
         item.total = this.getPrice(item);

         _items.push(item);
      }

      return { total: this.getTotal(_items), items: _items };
   }

   getPrice({ cost, quantity }: any) {
      return +cost * +quantity;
   }

   getTotal(items: any[]): number {
      return items.reduce((sum, { total }) => sum + total, 0);
   }
}