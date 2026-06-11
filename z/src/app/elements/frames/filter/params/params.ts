import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { Component, effect, inject, WritableSignal } from '@angular/core';
import { SearchParamsMap } from '../../../../utils/types';
import { IconButton } from "../../../buttons/icon-button/icon-button";
import { FilterBridge } from '../filter.bridge';

@Component({
  selector: 'filter-params',
  imports: [KeyValuePipe, NgTemplateOutlet, IconButton],
  templateUrl: './params.html',
  styleUrl: './params.scss',
})
export class FilterParams {
  constructor() {
    this.params = this.bridge.searchParams;
    effect(() => console.log(this.params()))
  }

  readonly bridge = inject(FilterBridge);

  readonly params: WritableSignal<SearchParamsMap>;

  remove(e: MouseEvent, param: any) {
    e.preventDefault();

    this.bridge.removeSearchParam(param.field);
    this.bridge.closeDropdown();
    this.bridge.resetSearch();
  }
}
