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
}
