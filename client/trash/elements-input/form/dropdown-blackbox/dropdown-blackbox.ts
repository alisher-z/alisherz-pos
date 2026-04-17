import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { HttpBaseZ } from '../../../../components/http-base';
import { DropBoxInput } from "../../drop-box/drop-box";

@Component({
  selector: 'form-dropdown-blackbox',
  imports: [DropBoxInput, Field],
  templateUrl: './dropdown-blackbox.html',
  styleUrl: './dropdown-blackbox.scss',
})
export class FormDropdownBlackbox {
  label = input<string | null>(null);
  pk = input.required<FieldTree<string, string>>();
  http = input.required<HttpBaseZ>();

  tr = contentChild<TemplateRef<any> | null>('tr');

  get list() {
    return this.http().list.value();
  }
  get field() {
    return this.pk();
  }
}
