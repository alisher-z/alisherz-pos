import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { BRAND_SCHEMA } from '../../../../../schemas/public-brand';
import { getBrandInitData, getBrandValues } from '../../../../data/public-brand';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { BrandFormTemplate } from '../../../../templates/forms/public/brand/brand';
import { BrandType } from '../../../../types/form/public-brand';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpBrandZ } from '../brand.http';

@Component({
  selector: 'brand-formz',
  imports: [BaseFormz, BrandFormTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class BrandFormZ extends FormCommonProperties<BrandType> {
  override http = inject(HttpBrandZ);
  override modelz = signal<BrandType>(getBrandInitData());
  override formz = form(this.modelz, BRAND_SCHEMA);

  override makeit(): void {
    const values = getBrandValues(this.formz);
    this.structured.set(values);
  }

  getData = effect(() => {
    const data: BrandType = this.data();
    if (!data) return;

    const brand = getBrandInitData({
      pk: data.pk,
      name: data.name,
      notes: data.notes,
      active: data.active
    });

    this.formz().value.set(brand);
  });
}
