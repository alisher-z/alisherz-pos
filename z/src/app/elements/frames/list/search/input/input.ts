import { afterRenderEffect, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { IconButton } from '../../../../buttons/icon-button/icon-button';
import { ListFrameSearchBridge } from '../search.bridge';
import { ListFrameSearchParams } from './params/params';

@Component({
  selector: 'list-frame-search-input',
  imports: [IconButton, ListFrameSearchParams],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class ListFrameSearchInput {
  readonly bridge = inject(ListFrameSearchBridge);
  readonly textboxRef = viewChild.required<ElementRef<HTMLInputElement>>('textbox');
  textbox!: HTMLInputElement;

  constructor() {
    afterRenderEffect({
      read: () => (this.textbox = this.textboxRef().nativeElement),
    });
  }

  input({ value }: HTMLInputElement) {
    this.bridge.searchText.set(value.trim());
  }

  arrowdown(e: Event) {
    e.preventDefault();
    const index = this.bridge.index();
    if (index >= this.bridge.searchFields().length - 1) return;

    this.bridge.index.set(index + 1);
  }

  arrowup(e: Event) {
    e.preventDefault();
    const index = this.bridge.index();
    if (index <= 0) return;

    this.bridge.index.set(index - 1);
  }

  enter(e: Event) {
    e.preventDefault();
    this.bridge.updateSearchParams();
    this.bridge.resetSearch();

    for (let [key, value] of this.bridge.searchParams()) {
      console.log(value);
    }
  }

  clearAndFocus() {
    this.textbox.value = '';
    this.bridge.searchText.set('');
    this.textbox.focus();
  }

  e = effect(() => {
    const text = this.bridge.searchText();
    if (text.length > 0) this.bridge.popover().open();
    else this.bridge.popover().close();
  });
}
