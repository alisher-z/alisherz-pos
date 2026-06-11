import { Component, inject } from '@angular/core';
import { debouncez } from '../../../../utils/util';
import { SelectBoxBridge } from '../select-box.bridge';

@Component({
  selector: 'select-box-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class SelectBoxInput {
  bridge = inject(SelectBoxBridge);
  search = debouncez((val: any) => this.search_(val), 100);

  private search_({ value }: HTMLInputElement) {
    this.bridge.http_.setQuery({ search: value.trim() });
  }
}
