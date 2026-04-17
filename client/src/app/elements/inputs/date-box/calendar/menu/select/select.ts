import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { Component, effect } from '@angular/core';
import { waitForMe } from "../../../../../../utils/wait-for-me";
import { IconButton } from "../../../../../buttons/icon-button/icon-button";
import { Popup } from "../../../../../popup/popup";
import { DateSelectInit } from "./select.init";

@Component({
  selector: 'date-select',
  imports: [IconButton, CdkOverlayOrigin, Popup],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class DateSelect extends DateSelectInit {
  onValue = effect(() => this.index.set(this.value()));

  click(e: PointerEvent) {
    this._popup.toggle();
    this._scrollTo();
  }

  itemClick(index: number) {
    this.value.set(index);
    this._popup.hide();
  }

  arrowdown() {
    if (!this._popup.opened()) {
      this._popup.show();
      this._scrollTo();
      return;
    }

    this.increaseIndex();
  }

  arrowup() {
    if (this._popup.opened())
      this.decreaseIndex();
  }

  arrowright() {
    if (this._popup.opened())
      this._popup.hide();

    this.increaseIndex();
    this.value.set(this.index());
  }

  arrowleft() {
    if (this._popup.opened())
      this._popup.hide();

    this.decreaseIndex();
    this.value.set(this.index());
  }

  enter() {
    this.value.set(this.index());
  }

  escape() {
    this.index.set(this.value());
  }

  async _scrollTo() {
    if (!this._popup.opened())
      return;

    await waitForMe();
    this.onIndex();
  }
}
