import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { HttpBase } from '../../../http/http.base';
import { VirtualTable } from '../virtual-table/virtual-table';

@Component({
  selector: 'http-vtable',
  imports: [VirtualTable, NgTemplateOutlet],
  templateUrl: './http-virtual-table.html',
  styleUrl: './http-virtual-table.scss',
})
export class HttpVirtualTable {
  http = input.required<HttpBase>();

  numberOfColumns = input<number>();
  isActionBtns = input<boolean>(true);
  isHead = input<boolean>(true);
  isFoot = input<boolean>(true);
  activePK = input<string>();

  rowDownClick = output<{ event: MouseEvent; item: any }>();
  editClick = output<any>();
  deleteClick = output<any>();

  tableRef = viewChild.required(VirtualTable);
  row1 = contentChild<TemplateRef<any>>('row');
  reset = signal(false);

  nextChunk() {
    console.log('hi');
    const page = this.http().pagination.page() + 1;
    this.http().pagination.page.set(page);
  }

  get items() {
    return this.http().chunks();
  }
}
