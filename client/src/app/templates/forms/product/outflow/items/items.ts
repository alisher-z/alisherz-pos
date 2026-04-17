import { Component, inject, input, output } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpProductSelfZ } from '../../../../../components/product/self/self.http';
import { GridviewZ } from '../../../../../elements/gridview/gridview';
import { ProductOutflowTypeExt } from '../../../../../types/form/product-outflow';
import { ItemsPipe } from './items.pipe';
import { ProductOutflowItemsService } from './items.service';

@Component({
  selector: 'product-outflow-items-template',
  templateUrl: './items.html',
  styleUrl: './items.scss',
  imports: [ItemsPipe, GridviewZ, RouterLink, RouterOutlet],
  providers: [ProductOutflowItemsService]
})
export class ProductOutflowItemsTemplate {
  form = input.required<FieldTree<ProductOutflowTypeExt>>();

  total = output<number>();

  service = inject(ProductOutflowItemsService);
  httpProduct = inject(HttpProductSelfZ);
  router = inject(Router);
  route = inject(ActivatedRoute);


  constructor() {
    this.service.form = this.form
  }

  edit({ index }: any) {
    this.service.itemIndex = index;
    this.router.navigate(['item'], { relativeTo: this.route });
  }

  delete({ item, index }: any) {
    const dels = structuredClone(this.form().outflow.item.deletes!().value());
    dels.push(item.pk);

    this.form().outflow.item.deletes!().value.set(dels);

    const items = structuredClone(this.service.items_);
    items.splice(index, 1);
    this.form().outflow.item.saves().value.set(items);
  }

  get products() {
    return this.httpProduct.productMap();
  }

  get items() {
    return this.form().outflow.item.saves().value();
  }
}
