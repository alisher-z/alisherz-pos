import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridviewZ } from "../../../../../elements/gridview/gridview";
import { HttpProductSelfZ } from '../../../self/self.http';
import { ItemsPipe } from './items.pipe';
import { ProductOutflowItemsService } from './items.service';

@Component({
  selector: 'product-outflow-items',
  imports: [GridviewZ, ItemsPipe],
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class ProductOutflowItems {
  service = inject(ProductOutflowItemsService)
  httpProduct = inject(HttpProductSelfZ);
  products = signal<Map<string, any>>(new Map);

  router = inject(Router);
  route = inject(ActivatedRoute);

  onHttp = effect(() => {
    const list: any[] = this.httpProduct.list.value();
    if (!list) return;

    this.products.set(new Map(
      list.map(p => [p.pk, p])
    ));
  });

  get items() {
    return this.service.form.outflow.item.saves().value();
  }

  edit({ item }: any) {
    this.service.itemPK.set(item.pk);
    this.router.navigate(['item'], { relativeTo: this.route });
  }

  delete({ item, index }: any) {
    const dels = structuredClone(this.service.form.outflow.item.deletes!().value());
    dels.push(item.pk);

    this.service.form.outflow.item.deletes!().setControlValue(dels);

    const items = structuredClone(this.service.items_);
    items.splice(index, 1);

    this.service.itemsTree().setControlValue(items);
  }
}
