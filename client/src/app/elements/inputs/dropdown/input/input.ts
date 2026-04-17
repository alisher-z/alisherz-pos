import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconButton } from "../../../buttons/icon-button/icon-button";
import { DropdownBridge } from '../dropdown.bridge';
import { DropdownInputAction } from './input.action';

@Component({
  selector: 'dropdown-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  imports: [IconButton, FormsModule],
  providers: [DropdownInputAction]
})
export class DropdownInput {
  bridge = inject(DropdownBridge);
  action = inject(DropdownInputAction);
  oldItem: any = null;

  constructor() {
    effect(() => this.bridge.textbox.set(this.textboxRef().nativeElement));
  }

  private textboxRef = viewChild.required<ElementRef<HTMLInputElement>>('textbox');

  click(e: MouseEvent, input: HTMLInputElement) {
    e.preventDefault();
    this.bridge.popup().toggle();
    input.select();
  }

  focus(input: HTMLInputElement) {
    this.bridge.popup().show();
    input.select();
    this.oldItem = this.bridge.item();
  }

  input(e: Event) {
    this.bridge.value.set(null);
    this.action.search(e.target);
  }

  blur(e: FocusEvent) {
    this.bridge.left.emit(this.bridge.item());
    this.bridge.value.set(this.bridge.activePK() ?? null);
    this.bridge.setSearchText();

    if (!this.bridge.activePK())
      this.bridge.http_.setQuery({});
  }

  enter(e: Event) {
    if (!this.bridge.popup().opened())
      return;

    e.preventDefault();
    this.bridge.popup().hide();
    this.bridge.value.set(this.bridge.activePK() ?? null);
    this.bridge.setSearchText();
    if (!this.bridge.activePK())
      this.bridge.http_.setQuery({});

    this.action.select(<any>e.target);
  }

  escape(e: Event) {
    if (this.oldItem?.pk === this.bridge.item()?.pk)
      return;

    this.bridge.item.set(this.oldItem);
    if (this.bridge.displayText() !== this.bridge.searchText() && this.bridge.searchText() !== '')
      e.stopPropagation();

    const index = this.bridge.http_.chunks().findIndex(i => i?.pk === this.oldItem?.pk);
    if (index >= 0)
      this.bridge.index.set(index);

    this.bridge.value.set(this.bridge.activePK() ?? null);
    this.bridge.setSearchText();
    this.action.select(<any>e.target);
  }

  backspace(input: HTMLInputElement) {
    if (!input.value && !this.bridge.popup().opened())
      this.bridge.popup().show();
  }

  arrowdow(e: Event) {
    this.action.select(<any>e.target);
    if (!this.bridge.popup().opened())
      return this.bridge.popup().show();

    e.preventDefault();
    this.action.nextRow();
  }

  arrowup(e: Event) {
    e.preventDefault();
    this.action.prevRow();
    this.action.select(<any>e.target);
  }

  pagedown(e: Event) {
    e.preventDefault();
    this.action.nextPage();
    this.action.select(<any>e.target);
  }

  pageUp(e: Event) {
    e.preventDefault();
    this.action.prevPage();
    this.action.select(<any>e.target);
  }

  home(e: Event) {
    e.preventDefault();
    this.bridge.index.set(0);
    this.action.select(<any>e.target);
  }

  end(e: Event) {
    e.preventDefault();
    this.bridge.index.set(
      this.bridge.http_.chunks().length - 1
    );
    this.action.select(<any>e.target);
  }
}
