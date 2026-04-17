import { Component } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { get } from 'lodash';
import { IconButton } from "../../../buttons/icon-button/icon-button";
import { ComboBoxInputInit } from './input.init';
import { ComboBoxInputReaction } from './input.react';

@Component({
  selector: 'combobox-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  imports: [FormField, IconButton],
  providers: [ComboBoxInputReaction]
})
export class ComboBoxInput extends ComboBoxInputInit {
  btnClick(e: MouseEvent) {
    e.preventDefault();
    this.bridge.popup().toggle();
    this.textbox.select();
  }

  inputFocus() {
    this.oldItem = this.bridge.item();
    this.bridge.popup().show();
    this.textbox.select();
  }

  inputBlur() {
    this.bridge.setValue();
    const text = this.searchForm().value();
    const pk = this.bridge.pk();

    if (text && !pk) {
      this.reactions.shouldSelect = false;
      this.searchForm().value.set('');
    }
    this.reactions.textChangedFromItemChanges = false;
  }

  inputHomeKey(e: Event) {
    this.reactions.goToFirst(e);
  }

  inputEndKey(e: Event) {
    this.reactions.goToLast(e);
  }

  inputPageUpKey(e: Event) {
    this.reactions.goToNextPage(e);
  }

  inputPageDownKey(e: Event) {
    this.reactions.goToPrevPage(e);
  }

  inputArrowUpKey(e: Event) {
    this.reactions.prevRow(e);
  }

  inputArrowDownKey(e: Event) {
    if (!this.bridge.popup().opened())
      return this.bridge.popup().show();

    this.reactions.nextRow(e);
  }

  inputEnterKey(e: Event) {
    this.reactions.textChangedFromItemChanges = false;

    if (!this.bridge.popup().opened()) return;

    e.preventDefault();
    this.bridge.popup().hide();
    this.bridge.setValue();
    this.reactions.shouldSelect = true;
  }

  inputEscapeKey(e: Event) {
    if (this.oldItem?.pk === this.bridge.item_?.pk) return;

    this.bridge.item.set(this.oldItem);
    const fieldText = get(this.oldItem, this.bridge.field_);
    const text = this.searchForm().value();

    if (fieldText !== text && text !== '')
      e.stopPropagation();
    // if (get(this.oldItem, this.bridge.field_) !== this.searchForm().value() && this.searchForm().value() !== '')

    this.bridge.setValue();
    this.reactions.shouldSelect = true;
  }

  backspaceKey(target: HTMLInputElement) {
    if (!target.value && !this.bridge.popup().opened())
      this.bridge.popup().show();
  }
}
