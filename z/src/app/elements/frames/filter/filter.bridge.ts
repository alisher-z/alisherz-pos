import { Injectable, InputSignal, Signal, signal } from '@angular/core';
import { SearchFields } from '../../../http/types';
import { SearchParamsMap } from '../../../utils/types';
import { Popover } from '../../popups/popover/popover';

@Injectable()
export class FilterBridge {
  popover!: Signal<Popover>;
  searchFields!: InputSignal<SearchFields[]>;
  searchParams = signal<SearchParamsMap>(new Map());
  searchText = signal('');
  searchIndex = signal(0);
  parentWidth = signal('0rem');

  textbox!: HTMLInputElement;

  openDropdown() {
    this.popover().open();
  }

  updateSearchParams() {
    const { label, field } = this.searchFields()[this.searchIndex()];
    const text = this.searchText();

    this.searchParams.update((params) => {
      const params_ = params.get(field);

      params_
        ? params_.params.add(text)
        : params.set(field, {
            label,
            field,
            params: new Set([text]),
          });

      return new Map(params);
    });
  }

  resetSearch() {
    this.searchText.set('');
    this.searchIndex.set(0);
    this.textbox.value = '';
    this.textbox.focus();
  }
}
