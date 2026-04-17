import { Component, inject } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { HttpBrandZ } from '../../../../../components/public/brand/brand.http';
import { DropBoxInput } from '../../../../../elements/inputs/drop-box/drop-box';
import { FormDropBoxCommons } from '../../../../extensions/dropbox-common';

@Component({
  selector: 'brand-dropbox',
  imports: [DropBoxInput, FormField],
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
})
export class BrandDropBox extends FormDropBoxCommons {
  override http = inject(HttpBrandZ);
}
