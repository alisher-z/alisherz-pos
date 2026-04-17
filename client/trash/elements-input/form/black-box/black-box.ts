import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, effect, input, model, signal, TemplateRef, untracked } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { HttpBaseZ } from '../../../../components/http-base';
import { iFormCommonType } from '../../../../templates/forms/common.type';
import { CheckButton } from "../../../buttons/check-button/check-button";
import { DropBoxInput } from '../../drop-box/drop-box';

@Component({
  selector: 'form-black-box',
  imports: [DropBoxInput, NgTemplateOutlet, CheckButton, Field],
  templateUrl: './black-box.html',
  styleUrl: './black-box.scss',
})
export class FormBlackBox {
  tree = input.required<FieldTree<unknown> | undefined>();
  http = input.required<HttpBaseZ>();
  label = input<string | null>(null);
  value = model<string | null>(null);

  ddvalue = signal<string | null>(null);
  tr = contentChild<TemplateRef<any> | null>('tr');

  onvalue = effect(() => {
    const value = this.value();
    if (!this.items || untracked(this.ddvalue) === value) return;

    const isnew = untracked(this.tree_.isNew().value);
    if (!isnew)
      this.ddvalue.set(value);
  })

  onisnew = effect(() => {
    const isnew = this.tree_.isNew().value();
    const ddvalue = this.ddvalue();
    if (!this.items) return;

    if (!isnew)
      return this.value.set(ddvalue);

    const pk = untracked(this.tree_.pk().value);
    this.value.set(pk);
  })

  get tree_(): FieldTree<iFormCommonType> {
    return <any>untracked(this.tree);
  }

  get isNew() {
    return this.tree_().value().isNew;
  }

  get items() {
    return this.http().list.value();
  }
}
