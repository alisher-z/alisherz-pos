import { apply, FieldTree, hidden, required, schema } from "@angular/forms/signals";
import { v7 } from "uuid";
import { maxLength } from "../../../../../utils/custome-validations/max.length";
import { iProductSelfExt, initialData as productInitialData, scheamz as productSchema, getFormValue as productValue } from "../../self/self.type";

export interface iProductOutflowItem {
   pk: string;
   outflow: string;
   product: string;
   price: string;
   quantity: number;
   notes: string | null;
}

export interface iProductOutflowItemExt {
   item: iProductOutflowItem;
   product: iProductSelfExt;
}

export const outflowItemInitialData: iProductOutflowItemExt = {
   item: {
      pk: v7(),
      outflow: '',
      product: '',
      price: '',
      quantity: 1,
      notes: null
   },
   product: {
      type: productInitialData.type,
      brand: productInitialData.brand,
      product: {
         ...productInitialData.product,
         isNew: false
      }
   }
}

export const outflowItemSchema = schema<iProductOutflowItem>(p => {
   required(p.pk);
   required(p.outflow);
   required(p.product);
   required(p.price);
   required(p.quantity);
   maxLength(p.notes, 1000, { message: 'Notes must not exceed above 1,000 charecters!' });
});

export const outflowItemSchemaz = schema<iProductOutflowItemExt>(p => {
   apply(p.product, productSchema);
   apply(p.item, outflowItemSchema);
   hidden(p.product, (ctx) => !ctx.valueOf(p.product.product.isNew));
});

export function getFormValue(form: FieldTree<iProductOutflowItemExt>) {
   const {
      product: { product: { isNew: productNew } },
      item
   } = form().value();

   return {
      item,
      product: !productNew
         ? undefined
         : productValue(form.product)
   }
}