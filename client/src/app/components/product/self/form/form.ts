import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getProductSelfInitData, getProductSelfValues } from '../../../../../data/product-self';
import { PRODUCT_SELF_SCHEMA_EXT } from '../../../../../schemas/product-self';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { ProductSelfFormTemplate } from '../../../../templates/forms/product/self/self';
import { ProductSelfType, ProductSelfTypeExt } from '../../../../types/form/product-self';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpProductSelfZ } from '../self.http';

@Component({
   selector: 'prduct-self-formz',
   imports: [BaseFormz, ProductSelfFormTemplate],
   templateUrl: './form.html',
   styleUrl: './form.scss',
})
export class ProductSelfFormZ extends FormCommonProperties<ProductSelfTypeExt> {
   http = inject(HttpProductSelfZ);

   modelz = signal<ProductSelfTypeExt>(getProductSelfInitData());
   formz = form(this.modelz, PRODUCT_SELF_SCHEMA_EXT);

   getData = effect(() => {
      const data: ProductSelfType = this.data();
      if (!data) return;

      const product = getProductSelfInitData({
         product: {
            pk: data.pk,
            barcode: data.barcode,
            name: data.name,
            type: data.type,
            brand: data.brand,
            serial: data.serial,
            model: data.model,
            notes: data.notes
         }
      });

      this.formz().value.set(product);
   });



   makeit() {
      const values = getProductSelfValues(this.formz);
      this.structured.set(values);
   }
}
