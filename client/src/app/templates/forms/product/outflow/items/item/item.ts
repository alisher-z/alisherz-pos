import { Component, computed, effect, input, signal, untracked } from '@angular/core';
import { FieldTree, FormField } from "@angular/forms/signals";
import { NoteBoxInput } from '../../../../../../elements/inputs/note-box/note-box';
import { NumberBoxInput } from '../../../../../../elements/inputs/number-box/number-box';
import { ProductOutflowItemType } from '../../../../../../types/form/product-outflow-item';
import { FormInputBlackBox } from '../../../../black-box/black-box';
import { ProductSelfDropBox } from '../../../self/drop-box/drop-box';

@Component({
  selector: 'product-outflow-item-templatez',
  imports: [FormInputBlackBox, ProductSelfDropBox, FormField, NumberBoxInput, NoteBoxInput],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class ProductOutflowItemTemplate {
  constructor() {
    effect(this.onQuantityLeft);
  }

  tree = input.required<FieldTree<ProductOutflowItemType>>();
  price = signal<number>(0);
  quantityLeft = signal<number | undefined>(0);

  total = computed(() => {
    const quantity = +this.form.quantity().value();
    return this.price() * quantity;
  });

  private onQuantityLeft = () => {
    const quantityLeft = this.quantityLeft();
    if (!quantityLeft) return;

    const quantity = untracked(this.form.quantity().value);

    if (quantityLeft > 0) {
      if (quantity > 0) return;
      else this.form.quantity().value.set(1);
    }
    else if (quantityLeft < 1) {
      this.form.quantity().value.set(0);
    }
  }

  blur(value: number | null) {
    const quantityLeft = this.quantityLeft();
    if (!quantityLeft) return;

    const quantity = value ?? 0;

    if (quantityLeft > 0 && quantity <= quantityLeft) return;
    if (quantityLeft < 0)
      return this.form.quantity().value.set(0);
    if (quantity > quantityLeft && quantity > 1)
      return this.form.quantity().value.set(quantityLeft);
  }

  select(item: any) {
    if (item)
      console.log(item.quantity);
    this.setQuantityLeft(item?.quantity);
    this.setPrice(item?.price);
  }

  setQuantityLeft(quantity: { left: number } | null) {
    this.quantityLeft.set(quantity?.left);
  }

  setPrice(price: { pk: string, amount: number } | null) {
    this.price.set(price?.amount ?? 0);
    this.form.price().value.set(price?.pk ?? '');
  }

  get form() {
    return this.tree();
  }
}
