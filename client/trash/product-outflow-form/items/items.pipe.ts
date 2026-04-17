import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'items',
})
export class ItemsPipe implements PipeTransform {
  transform(items: any[], products: Map<string, any>): { total: number, items: any[] } | null {
    const _items = structuredClone(items);

    for (const i of _items) {
      const product = products.get(i.product);
      if (!product)
        continue;

      i.price = product.price;
      i.product = product.name;
      i.total = this.getPrice(i);
    }

    return { total: this.getTotao(_items), items: _items };
  }

  getPrice({ price, quantity }: { price: number, quantity: number }) {
    return +price * +quantity
  }

  getTotao(items: any[]) {
    return items.reduce((sum, item) => sum + item.total, 0);
  }
}
