import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FilterBridge } from '../filter.bridge';

@Component({
  selector: 'filter-dropdown',
  imports: [NgTemplateOutlet],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
  host: {
    '[style.--parent-width]': 'bridge.parentWidth()',
  },
})
export class FilterDropdown {
  bridge = inject(FilterBridge);

  click(index: number, e: MouseEvent) {
    e.preventDefault();

    this.bridge.searchIndex.set(index);
    this.bridge.closeDropdown();
    this.bridge.updateSearchParams();
    this.bridge.resetSearch();
  }
}
