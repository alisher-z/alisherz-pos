import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChild, inject, signal, TemplateRef } from '@angular/core';
import { ScrollIntoView } from '../../../../extensions/scroll-into-view';
import { DropdownInputUtils } from '../dropdown.utils';

@Component({
  selector: 'dropdown-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  imports: [NgTemplateOutlet],
  host: {
    '[style.--column]': 'column()',
    '[style.--parent-width]': 'parentWidth()'
  }
})
export class DropdownList extends ScrollIntoView {
  listItem = contentChild<TemplateRef<any> | null>('listItem');

  dropdown = inject(DropdownInputUtils);

  column = computed(() =>
    this.scrollRefs()[0]?.nativeElement.childElementCount ?? 0
  );



  parentWidth = signal('0rem');

  rowClick(e: MouseEvent, item: any) {
    e.preventDefault();
    this.dropdown.item.set(item);
    this.dropdown.popup().hide();
    this.dropdown.dropdownSearch().searchInput.value = item[this.dropdown.filterBy()];
    this.dropdown.dropdownSearch().searchInput.select();
  }

  get list() {
    return this.dropdown.filteredList();
  }
}
