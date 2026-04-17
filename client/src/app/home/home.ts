import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { HttpCustomerZ } from '../components/parties/customer/customer.http';
import { Dropdown } from "../elements/inputs/dropdown/dropdown";

@Component({
  selector: 'home',
  imports: [Dropdown, FormField],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  http = inject(HttpCustomerZ);
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

  // e = effect(() => console.log(this.f().value()));
}
