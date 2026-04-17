import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, output, TemplateRef } from '@angular/core';

@Component({
  selector: 'gridviewz',
  imports: [NgTemplateOutlet],
  templateUrl: './gridview.html',
  styleUrl: './gridview.scss',
})
export class GridviewZ {
  row = contentChild<TemplateRef<any> | null>('row');
  list = input.required<any[] | null>();

  edit = output<any>();
  del = output<any>();

  get items() {
    return this.list() ?? [];
  }
}
