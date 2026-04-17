import { Component, effect, input, signal, untracked } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { NumberBoxInput } from "../../../../../../elements/inputs/number-box/number-box";
import { ProductInflowDetailTypeExt } from '../../../../../../types/form/product-inflow-details';
import { FormInputBlackBox } from "../../../../black-box/black-box";
import { ProductOutflowItemsTemplate } from "../../../outflow/items/items";

@Component({
  selector: 'product-inflow-detail-templatez',
  imports: [FormInputBlackBox, NumberBoxInput, FormField, ProductOutflowItemsTemplate],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class ProductInflowDetailTemplate {
  tree = input.required<FieldTree<ProductInflowDetailTypeExt>>();
  totalAmount = signal<number>(0);
  dueAmount = signal<number>(0);


  setReceivedAmount = effect(() => {
    const received = this.totalAmount();
    const discount = this.form.detail.discount().value();

    const due = untracked(this.dueAmount);
    if (due === 0)
      this.form.detail.amount().value.set(received - discount);
  })

  setDueAmount = effect(() => {
    const totalAmount = this.totalAmount();
    const received = this.form.detail.amount().value();
    const discount = this.form.detail.discount().value();

    this.dueAmount.set(totalAmount - received - discount);
  });

  get form() {
    return this.tree();
  }

  totalItemsPrice(amount: number) {
    this.totalAmount.set(amount);
  }
}
