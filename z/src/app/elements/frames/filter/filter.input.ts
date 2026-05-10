import { Directive, ElementRef, inject } from '@angular/core';
import { FilterBridge } from './filter.bridge';

@Directive({
  selector: '[filter-input]',
  host: {
    '(input)': 'input($any($event.target))',
    '(keydown.enter)': 'enter($event)',
    '(keydown.tab)': 'enter($event)',
    '(keydown.arrowdown)': 'arrowdown($event)',
    '(keydown.arrowup)': 'arrowup($event)',
    '(keydown.backspace)': 'backspace($event)'
  },
})
export class FilterInput {
  elRef = inject(ElementRef);
  bridge = inject(FilterBridge);

  ngAfterViewInit() {
    this.bridge.textbox = this.elRef.nativeElement;
  }

  input({ value }: HTMLInputElement) {
    this.bridge.openDropdown();
    this.bridge.searchText.set(value.trim());
  }

  enter(e: Event) {
    if (!this.bridge.searchText()) return;

    e.preventDefault();
    this.bridge.updateSearchParams();
    this.bridge.closeDropdown();
    this.bridge.resetSearch();
  }

  arrowdown(e: Event) {
    e.preventDefault();
    this.increaseIndex();
  }

  arrowup(e: Event) {
    e.preventDefault();
    this.decreaseIndex();
  }

  backspace({ target }: Event) {
    const paramsMap = this.bridge.searchParams();

    if ((<HTMLInputElement>target).value || paramsMap.size < 1) return;

    const lastKey = [...paramsMap.keys()].at(-1)!;

    paramsMap.delete(lastKey);
    this.bridge.form.update(value => {
      value[lastKey] = [];
      return structuredClone(value);
    });
    // this.bridge.searchParams.set(new Map(paramsMap));
    this.bridge.closeDropdown();
  }

  private increaseIndex() {
    const index = this.bridge.searchIndex();
    const maxIndex = this.bridge.searchFields().length - 1;

    if (index < maxIndex) this.bridge.searchIndex.set(index + 1);
  }

  private decreaseIndex() {
    const index = this.bridge.searchIndex();
    if (index > 0) this.bridge.searchIndex.set(index - 1);
  }
}
