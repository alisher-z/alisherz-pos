import { OutputEmitterRef, Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'transform_items' })
export class ItemsPipe implements PipeTransform {
   transform(items: any[], products: Map<string, any>, total: OutputEmitterRef<number>): { total: number, items: any[] } | null {
      const _items = structuredClone(items);

      for (const i of _items) {
         const product = products.get(i.product);
         if (!product)
            continue;

         i.price = product.price;
         i.product = product.name;
         i.total = this.getPrice(i);
      }

      return { total: this.getTotal(_items, total), items: _items };
   }

   getPrice({ price, quantity }: { price: any, quantity: number }) {
      return +price.amount * +quantity
   }

   getTotal(items: any[], output: OutputEmitterRef<number>) {
      const total = items.reduce((sum, item) => sum + item.total, 0);
      output.emit(total);
      return total;
   }
}