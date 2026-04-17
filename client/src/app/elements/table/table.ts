import { NgTemplateOutlet } from '@angular/common';
import { Component, model, TemplateRef, untracked, viewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'tablez',
  imports: [NgTemplateOutlet],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class TableZ {
  headRow = model<TemplateRef<any>>();
  bodyVCR = viewChild.required('tbody', { read: ViewContainerRef });
  bodyTR = viewChild.required('bodytemplate', { read: TemplateRef });

  setHeadRow(tr: TemplateRef<any> | undefined) {
    if (!this.headRow_)
      this.headRow.set(tr);
  }

  createView([item, index, cells]: [any, number, TemplateRef<any>]) {
    this.vcr.createEmbeddedView(this.bodyTempRef, {
      $implicit: item,
      index,
      cells: cells
    });
  }

  get headRow_() {
    return untracked(this.headRow);
  }

  get vcr() {
    return this.bodyVCR();
  }

  get bodyTempRef() {
    return this.bodyTR();
  }
}
