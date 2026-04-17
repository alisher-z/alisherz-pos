import { Component, inject, output } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { HttpProductSelfZ } from '../../../../../components/product/self/self.http';
import { ComboBox } from "../../../../../elements/inputs/combo-box/combo-box";
import { FormDropBoxCommons } from '../../../../extensions/dropbox-common';

@Component({
  selector: 'productself-dropbox',
  imports: [FormField, ComboBox],
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
})
export class ProductSelfDropBox extends FormDropBoxCommons {
  override http = inject(HttpProductSelfZ);
  selection = output<any>();
}
