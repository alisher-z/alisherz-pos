import { NgTemplateOutlet } from '@angular/common';
import { afterRenderEffect, Component, contentChild, inject, TemplateRef, untracked, viewChild } from '@angular/core';
import { VirtualTable } from "../../../virtual-table/virtual-table";
import { ComboBoxBridge } from '../combo-box.bridge';

/**
 - This component renders the dropdown list using a VirtualTable for performance. 
 - It ensures that the keyboard-highlighted item is always visible by managing 
 - the scroll position programmatically.
**/
@Component({
  selector: 'combobox-table',
  templateUrl: './table.html',
  styleUrl: './table.scss',
  imports: [VirtualTable, NgTemplateOutlet],
  host: {
    // Dynamically sets the table width based on the parent container's width signal.
    '[style.--parent-width]': 'bridge.tableMinWidth()'
  }
})
export class ComboBoxTable {

  constructor() {
    // Registers this table instance to the shared bridge so the input can interact with it.
    this.bridge.tableRef = this.tableRef;

    /**
     - Runs after the component has rendered. It monitors the 'bridge.index' signal.
     - If the highlighted index moves outside the currently visible range (viewport), 
       it triggers a scroll adjustment.
    **/
    afterRenderEffect({
      write: () => {
        const index = this.bridge.index();

        // Boundary Check: If index is above or below the current 'extended' view window, scroll.
        if (this.index < this.startIndex || this.index > this.endIndex)
          this.setScrollPosition(index);
      }
    });
  }

  bridge = inject(ComboBoxBridge);
  tableRef = viewChild.required(VirtualTable);
  trContent = contentChild<TemplateRef<any>>('row');

  rowClick({ event, item }: { event: MouseEvent, item: any }) {
    event.preventDefault();
    this.bridge.popup().hide();
    this.bridge.searchInput().reactions.shouldSelect = true;
    this.bridge.value.set(item?.pk ?? null);
  }


  /**
   - Calculates the pixel offset required to bring a specific item into view.
   - Uses 'itemHeight' to determine the math and schedules a 'scrollIntoView' 
   - to ensure smooth UI behavior.
  **/
  private setScrollPosition(index: number) {
    const itemHeight = untracked(this.tableRef_.itemHeight);
    const position = Math.floor(index * itemHeight);

    this.tableRef_.setScrollPosition(position);
    // Minor delay to ensure the virtual DOM has updated before focusing the element.
    setTimeout(() => this.tableRef_.scrollIntoView());
  }

  private get index() {
    return this.bridge.index();
  }

  private get startIndex() {
    return untracked(this.tableRef_.extendedStartIndex);
  }

  private get endIndex() {
    return untracked(this.tableRef_.extendedEndIndex);
  }

  private get tableRef_() {
    return untracked(this.tableRef);
  }
}
