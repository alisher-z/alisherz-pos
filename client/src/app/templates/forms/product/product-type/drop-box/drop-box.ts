import { Component, inject } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { HttpProductTypeZ } from '../../../../../components/product/product-type/product-teyp.http';
import { DropBoxInput } from '../../../../../elements/inputs/drop-box/drop-box';
import { FormDropBoxCommons } from '../../../../extensions/dropbox-common';

@Component({
  selector: 'productype-dropbox',
  imports: [DropBoxInput, FormField],
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
})
export class ProductTypeDropBox extends FormDropBoxCommons {
  override http = inject(HttpProductTypeZ);
}
