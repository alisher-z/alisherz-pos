import { Component, inject } from '@angular/core';
import { HttpBrandZ } from '../../../../../components/public/brand/brand.http';
import { BrandFormTemplate } from "../../../../../templates/forms/public/brand/brand";
import { iBrand } from '../../../../../templates/forms/public/brand/brand.type';
import { FormCommonInput } from '../../../extensions/form-common';
import { FormBlackBox } from "../../black-box/black-box";

@Component({
  selector: 'brand-input',
  imports: [FormBlackBox, BrandFormTemplate],
  templateUrl: './brand.html',
  styleUrl: './brand.scss',
})
export class BrandInput extends FormCommonInput<iBrand> {
  override http = inject(HttpBrandZ);
}
