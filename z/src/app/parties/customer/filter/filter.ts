import { Component, effect, inject, model } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Filter } from '../../../elements/frames/filter/filter';
import { CustomerFilterFields, CustomerFilterStructure } from '../utils/filter';
import { CustomerFilterModal } from './modal/modal';

@Component({
  selector: 'customer-filter',
  imports: [Filter, CustomerFilterModal],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  providers: [CustomerFilterStructure]
})
export class CustomerFilter {
  structure = inject(CustomerFilterStructure);

  constructor() {
    this.structure.form = form(this.modelz);
  }

  readonly modelz = model<CustomerFilterFields>(this.structure.getInitData());
  // readonly formz = form(this.modelz);

  done() {
    console.log('everything is done!');
    // const data = this.structure.getData(this.formz().value());
    // console.log('data is', data);
  }

  // private getInitData() {
  //   return { id: [], name: [], phone: [], email: [], address: [], notes: [] }
  // }

  e = effect(() => {
    // const form = this.formz().value();
    // console.log(form);
  })
}
