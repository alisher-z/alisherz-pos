import { apply, applyEach, hidden, required, schema } from "@angular/forms/signals";
import { v7 } from "uuid";
import { maxLength } from "../../../../utils/custome-validations/max.length";
import { initialData as customerInitialData, schemaz as customerSchema, iCustomer } from "../../parties/customer/customer.type";
import { iProductOutflowItemExt, outflowItemSchemaz } from "./item/item.type";

export interface iProductOutflow {
   pk: string;
   id: string | null;
   date: Date;
   customer: string;
   notes: string | null;
   items: iProductOutflowItemExt[]
}

export interface iProductOutflowExt {
   customer: iCustomer;
   outflow: iProductOutflow;
}

export const outflowInitialData: iProductOutflowExt = {
   outflow: {
      pk: v7(),
      id: null,
      date: new Date,
      customer: '',
      notes: null,
      items: []
   },
   customer: {
      ...customerInitialData,
      isNew: false
   }
}

export const outflowSchema = schema<iProductOutflow>(p => {
   required(p.pk);
   maxLength(p.notes, 100, { message: 'ID must not exceed above 100 charecters!' });
   required(p.date, { message: 'Date must be specified!' });
   required(p.customer, { message: 'Customer should be specified!' });
   maxLength(p.notes, 1000, { message: 'Notes must not exceed above 1,000 charecters!' });
   applyEach(p.items, outflowItemSchemaz);
   ///TODO validation for item which must be greater than 0;
});

export const outflowSchemaz = schema<iProductOutflowExt>(p => {
   apply(p.outflow, outflowSchema);
   apply(p.customer, customerSchema);
   hidden(p.customer, (c) => !c.valueOf(p.customer.isNew));
});

const a = {
   "customer": {
      "id": "ac2393b9360ef9cafe44bd06dfbcfbe6",
      "pk": "019b16df-3420-7dce-a9b3-7f8241a0d601",
      "name": "dbdabd3351a7bb46851b96d8cdf61fdf",
      "email": "45a7400a251afb2a643562d20eec12bf@gmail.com",
      "notes": "3bdf54622d120e3ad59bc06c6f8b949e",
      "phone": "f2e9a2b62671bbc60b9acfb633ec2349",
      "active": true,
      "address": "f3958c74b8fee73872c73b1a85d9401c"
   },
   "outflow": {
      "id": "f099f71926132ee4855b65f46d43392a",
      "pk": "019b16df-3421-7ae2-8a33-6a8567afdc4a",
      "date": "2025-12-13T08:41:25.266188+00:00",
      "notes": "54d64f6982cddcfb4b175dd25aa162e7",
      "customer": "019b16df-3420-7dce-a9b3-7f8241a0d601",
      "items": [
         {
            "pk": "019b16df-3421-7b0d-ae14-d4ceadfb813f",
            "notes": "998a43d48f4208616996fdb9487fa68a",
            "price": "019b16df-3421-7bcd-b22b-b00b43c43247",
            "outflow": "019b16df-3421-7ae2-8a33-6a8567afdc4a",
            "product": "019b16df-3421-7b91-8c00-339f4c934228",
            "quantity": 2
         },
         {
            "pk": "019b16df-3421-7bff-93fc-97a74d7cc459",
            "notes": "498af8828cbc3209e083aa1cfb322a71",
            "price": "019b16df-3421-7c8f-ba6e-e48fe5d8d0cb",
            "outflow": "019b16df-3421-7ae2-8a33-6a8567afdc4a",
            "product": "019b16df-3421-7c4f-b5c4-4691af56df56",
            "quantity": 2
         }
      ]
   }
}