import { Component, inject } from '@angular/core';
import { ListFrameSearchBridge } from '../search.bridge';

@Component({
  selector: 'list-frame-search-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
  host: {
    '[style.--parent-width]': 'bridge.inputWidth()',
  },
})
export class ListFrameSearchDropdown {
  bridge = inject(ListFrameSearchBridge);

  mousedown(label: string, e: MouseEvent) {
    e.preventDefault();
    this.bridge.popover().close();
    // this.bridge.searchParams.update((p) => {
    //   return [...p, { label, text: this.bridge.searchText() }];
    // });
    this.bridge.searchInput().clearAndFocus();
  }
}
