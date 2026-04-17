import { Component, OnInit, untracked } from '@angular/core';
import { IconButton } from "../../../buttons/icon-button/icon-button";
import { DropBoxSearchInit } from './search.init';
import { DropBoxSearchService } from './search.service';

@Component({
  selector: 'drop-box-search',
  templateUrl: './search.html',
  styleUrl: './search.scss',
  imports: [IconButton],
  providers: [DropBoxSearchService]
})
export class DropBoxSearch extends DropBoxSearchInit implements OnInit {
  ngOnInit() {
    this.service.setIndex(-1);
  }

  focus() {
    this.oldData = this.service.service.item();
    this.service.searchInput?.select();
    this.service.showPopup();
  }

  input({ value }: HTMLInputElement) {
    this.service.dontSetText = true;
    this.service.setIndex(-1);
    this.service.filter(value);
    if (value)
      this.service.setIndex(0);
  }

  blur() {
    this.resetItems();
    this.setText();
    this.left.emit(this.service.service.item());
  }

  down(e: Event) {
    e.preventDefault();
    this.service.dontSetText = true;
    if (!this.service.popup.opened()) {
      this.service.showPopup();
      return;
    }

    this.service.increaseIndex();
    this.service.searchInput?.select();
  }

  up(e: Event) {
    e.preventDefault();
    this.service.dontSetText = true;
    this.service.decreaseIndex(true);
    this.service.searchInput?.select();

    if (this.service.dropboxList.index() < 1 && this.service.list_.length !== this.service.items_.length)
      this.service.service.resetItems();
  }

  enter(e: Event) {
    if (this.service.popup.opened())
      e.preventDefault();
    this.service.popup.hide();
    this.setText();
    this.service.searchInput?.select();

    this.resetItems();
  }

  escape(e: Event) {
    this.service.service.item.set(this.oldData);
    if (this.oldData?.[this.service.by] !== this.service.searchInput?.value && this.service.searchInput?.value !== '') {
      this.service.service.resetItems();
      e.stopPropagation();
    }

    this.service.setIndex(untracked(this.service.service.item)?.index ?? -1);
    this.setText();
    this.service.searchInput?.select();
  }

  keydown(e: KeyboardEvent) {
    if (e.key.length <= 1)
      this.service.popup.show();
  }

  mouseDown(e: MouseEvent) {
    e.preventDefault();
    this.service.showPopup(true);
    this.service.searchInput?.select();
  }

  setText() {
    if (!this.service.searchInput)
      return;

    const item = untracked(this.service.service.item);
    this.service.searchInput.value = item?.[this.service.by] ?? '';
    this.service.setIndex(item?.index ?? -1);

    this.oldData = item;
  }

  private resetItems() {
    if (this.service.searchInput?.value)
      this.service.service.resetItems();
  }
}
