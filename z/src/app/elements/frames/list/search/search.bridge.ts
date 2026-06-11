import { computed, Injectable, InputSignal, Signal, signal } from '@angular/core';
import { SearchFields } from '../../../../http/types';
import { SearchParamsMap } from '../../../../utils/types';
import { Popover } from '../../../popups/popover/popover';
import { ListFrameSearchInput } from './input/input';

@Injectable()
export class ListFrameSearchBridge {
  searchFields!: InputSignal<SearchFields[]>;
  searchText = signal('');
  searchParams = signal<SearchParamsMap>(new Map());

  popover!: Signal<Popover>;
  searchInput!: Signal<ListFrameSearchInput>;
  inputWidth = signal<string>('0rem');
  index = signal(0);
  param = computed(() => this.searchFields()[this.index()]);

  updateSearchParams() {
    const { label, field } = this.searchFields()[this.index()];
    const text = this.searchText();

    this.searchParams.update((params) => {
      const p = params.get(field);
      p
        ? p.params.add(text)
        : params.set(field, {
            label,
            field,
            params: new Set([text]),
          });
      console.log('hello');
      return params;
    });
  }

  resetSearch() {
    this.searchInput().textbox.value = '';
    this.searchText.set('');
    this.index.set(0);
    this.searchInput().textbox.focus();
  }
}
