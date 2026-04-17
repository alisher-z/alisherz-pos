import { apply, FieldTree, hidden, required, schema } from "@angular/forms/signals";
import { v7 } from "uuid";
import { maxLength } from "../../../../utils/custome-validations/max.length";
import { iProductSelfExt, initialData as productSelfInitialData, scheamz as productSelfSchema, getFormValue as productValue } from "../self/self.type";

export interface iProductPriceHistory {
   pk: string;
   notes: string | null;
   amount: number;
   product: string;
}

export interface iProductPriceHistoryExt {
   history: iProductPriceHistory;
   product: iProductSelfExt;
}

export const initialData: iProductPriceHistoryExt = {
   product: {
      type: productSelfInitialData.type,
      brand: productSelfInitialData.brand,
      product: {
         ...productSelfInitialData.product,
         isNew: false
      }
   },
   history: {
      pk: v7(),
      notes: null,
      amount: 0,
      product: ''
   }
}

export const productPriceHistorySchema = schema<iProductPriceHistory>(p => {
   required(p.pk);
   maxLength(p.notes, 1000, { message: 'Price notes must not exceed above 1,000 charecters!' });
   required(p.amount, { message: 'Price amount must have value!' });
   required(p.product, { message: 'Product name is required!' });
});

export const schemaz = schema<iProductPriceHistoryExt>(p => {
   apply(p.history, productPriceHistorySchema);
   apply(p.product, productSelfSchema);
   hidden(p.product, (ctx) => !ctx.valueOf(p.product.product.isNew));
});

export function getFormValue(form: FieldTree<iProductPriceHistoryExt, string | number>) {
   const {
      product: { product: { isNew: productNew } },
      history
   } = form().value();

   return {
      history,
      product: !productNew
         ? undefined
         : productValue(form.product)
   }
}