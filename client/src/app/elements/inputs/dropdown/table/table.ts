import { NgTemplateOutlet } from '@angular/common';
import { afterRenderEffect, Component, contentChild, effect, inject, TemplateRef, untracked, viewChild } from '@angular/core';
import { VirtualTable } from "../../../virtual-table/virtual-table";
import { DropdownBridge } from '../dropdown.bridge';

@Component({
  selector: 'dropwdown-table',
  templateUrl: './table.html',
  styleUrl: './table.scss',
  imports: [VirtualTable, NgTemplateOutlet],
  host: {
    '[style.--parent-width]': 'bridge.tableMinWidth()'
  }
})
export class DropdownTable {
  bridge = inject(DropdownBridge);

  trContent = contentChild<TemplateRef<any>>('row');
  vtable = viewChild.required(VirtualTable);
  vtable_!: VirtualTable;
  shouldSelect = false;

  constructor() {
    effect(() => this.vtable_ = this.vtable());
    effect(() => this.select(this.bridge.searchText()));
    afterRenderEffect({
      write: () => this.setScrollPosition(this.bridge.index())
    });
  }

  rowClick({ event, item }: { event: MouseEvent, item: any }) {
    event.preventDefault();
    if (this.bridge.value() !== item?.pk)
      this.shouldSelect = true;

    this.bridge.popup().hide();
    this.bridge.value.set(item?.pk ?? null);
  }

  private setScrollPosition(index: number) {
    const start = untracked(this.vtable_.extendedStartIndex);
    const end = untracked(this.vtable_.extendedEndIndex);
    if (index >= start && index <= end)
      return;

    const position = Math.floor(index * untracked(this.vtable_.itemHeight));
    this.vtable_.setScrollPosition(position);
    setTimeout(() => this.vtable_.scrollIntoView());
  }

  private select(_: string) {
    if (this.shouldSelect)
      setTimeout(() => this.bridge.textbox()?.select());

    this.shouldSelect = false;
  }
}
