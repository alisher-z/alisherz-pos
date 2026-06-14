import { effect, Injectable, InputSignal, ModelSignal, Signal, signal, WritableSignal } from '@angular/core';
import { SearchFields } from '../../../http/types';
import { SearchParamsMap } from '../../../utils/types';
import { Popover } from '../../popups/popover/popover';
import { FilterBluePrint } from './utils/filter.blueprint';

@Injectable()
export class FilterBridge {
  constructor() {
    effect(() => {
      const structure = this.structure();

      this.form_ = structure.form().value;
      this.searchFields.set(structure.fields);
    });
    console.log('hello world');
  }

  popover!: Signal<Popover>;
  structure!: InputSignal<FilterBluePrint<any>>;
  form_!: WritableSignal<any>;

  searchFields = signal<SearchFields[]>([]);

  removeSearchParam(key: string) {
    this.searchParams()
      .delete(key);

    this.form_.update(value => {
      value[key] = [];
      return structuredClone(value);
    });
  }




  form!: ModelSignal<any>;
  searchParams = signal<SearchParamsMap>(new Map());
  searchText = signal('');
  searchIndex = signal(0);
  parentWidth = signal('0rem');

  textbox!: HTMLInputElement;

  openDropdown() {
    this.popover().open();
  }

  closeDropdown() {
    this.popover().close();
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
