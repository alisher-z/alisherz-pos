import { Component, effect, inject, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpProductInventoryZ } from '../../../../../components/product/inventory/inventory.http';
import { HttpProductSelfZ } from '../../../../../components/product/self/self.http';
import { GridviewZ } from "../../../../../elements/gridview/gridview";
import { ProductInventoryType } from '../../../../../types/form/product-inventory';
import { InventoryItemsPipe } from './items.pipe';
import { ProductInventoryItemsService } from './items.service';

@Component({
  selector: 'product-inventory-items-template',
  templateUrl: './items.html',
  styleUrl: './items.scss',
  imports: [GridviewZ, RouterLink, RouterOutlet, InventoryItemsPipe],
  providers: [ProductInventoryItemsService]
})
export class ProductInventoryItemsTemplate {
  constructor() {
    this.service.form = this.form;
  }

  form = input.required<FieldTree<ProductInventoryType>>();

  service = inject(ProductInventoryItemsService);
  http = inject(HttpProductInventoryZ);
  httpProduct = inject(HttpProductSelfZ)
  router = inject(Router);
  route = inject(ActivatedRoute);

  setItems = effect(() => {
    const data = this.http.one();
    if (!data) return;

    const items: any[] = [];
    for (const item of data.items)
      items.push({ item });

    this.form().item.saves().value.set(items);
  });

  edit({ index }: any) {
    this.service.itemIndex = index;
    this.router.navigate(['item'], { relativeTo: this.route });
  }

  delete({ item, index }: any) {
    const dels = structuredClone(this.form().item.deletes!().value());
    dels.push(item.pk);

    this.form().item.deletes!().value.set(dels);

    const items = structuredClone(this.service.items_);
    items.splice(index, 1);
    this.form().item.saves().value.set(items);
  }

  get products() {
    return this.httpProduct.productMap();
  }

  get items() {
    return this.form().item.saves().value();
  }
}
