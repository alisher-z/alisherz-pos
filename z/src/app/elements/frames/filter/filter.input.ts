import { Directive, ElementRef, inject } from '@angular/core';
import { FilterBridge } from './filter.bridge';

@Directive({
  selector: '[filter-input]',
  host: {
    '(input)': 'input($any($event.target))',
    '(keydown.enter)': 'enter($event)',
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
    e.preventDefault();
    this.bridge.updateSearchParams();
    this.bridge.resetSearch();
  }
}
