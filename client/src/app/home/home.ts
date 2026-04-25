import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { HttpCustomerZ } from '../components/parties/customer/customer.http';
import { HttpProductSelfZ } from '../components/product/self/self.http';
import { Dropdown } from "../elements/inputs/dropdown/dropdown";
import { SelectBox } from "../elements/inputs/select-box/select-box";
import { OutflowFormTemplatez } from "../templates/forms/outflow/outflow";

@Component({
  selector: 'home',
  imports: [Dropdown, FormField, SelectBox, OutflowFormTemplatez],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  http = inject(HttpCustomerZ);
  productHttp = inject(HttpProductSelfZ);
  m = signal<{ customer: string }>({ customer: '' });
  f = form(this.m);

  constructor() {
    setTimeout(() => {
      this.f.customer().value.set('019c5178-c92d-74df-8f08-59cf232242b5');
    }, 1000);
  }
  left(item: any) {
    // console.log(item);
  }
  textbox(input: any) {
    // console.log(input);
  }

  selected({ item, pk }: any) {
    console.log(pk);
  }

  // e = effect(() => console.log(this.f().value()));
  me(id: string) {
    this.active = id;
  }
  active: string = '';
}
