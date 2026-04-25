import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { VirtualTableInit } from './virtual-table.init';

/**
 * The visual implementation of the virtual scroll. 
 * It manages the actual scroll events and row activation.
**/
@Component({
  selector: 'vtable',
  imports: [NgTemplateOutlet],
  templateUrl: './virtual-table.html',
  styleUrl: './virtual-table.scss'
})
export class VirtualTable extends VirtualTableInit {
  setScrollPosition(position?: number) {
    this.scrollPosition.set(position ?? 0);
    this.viewportEl.scrollTop = position ?? 0;
  }

  scroll(el: HTMLElement) {
    requestAnimationFrame(() =>
      this.scrollPosition.set(el.scrollTop)
    )
  }

  /**
   * Determines if a row is the "Active" selection based on the primary key (PK).
   * Stores a reference to the active HTMLElement so the scrollIntoView logic 
   * knows exactly which element to target.
  **/
  getActiveRow(pk: string, row: HTMLElement) {
    if (pk !== this.activePK())
      return false;

    this.activeRow = row;
    return true;
  }

  ngOnDestroy() {
    this.destroyResizeObserver();
  }
}
