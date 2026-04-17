import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChild, inject, signal, TemplateRef } from '@angular/core';
import { ScrollIntoView } from '../../../../extensions/scroll-into-view';
import { DropBoxListService } from './list.service';

@Component({
  selector: 'drop-box-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  imports: [NgTemplateOutlet],
  providers: [DropBoxListService],
  host: {
    '[style.--column]': 'column()',
    '[style.--parent-width]': 'parentWidth()'
  }
})
export class DropBoxList extends ScrollIntoView {
  service = inject(DropBoxListService);
  tempRef = contentChild<TemplateRef<any> | null>('tempRef');

  column = computed(() =>
    this.scrollRefs()[0]
      ?.nativeElement.childElementCount ?? 0
  );

  parentWidth = signal('0rem');

  rowDown(e: MouseEvent, item: any) {
    e.preventDefault();
    this.service.popup.hide();
    if (this.service.service.list().length !== this.service.service.items().length)
      this.service.service.resetItems();

    this.service.item.set(item);
    this.setIndex(item?.index ?? -1);
    this.service.dropboxSearch.setText();
    this.service.searchInput?.select();
  }
}
