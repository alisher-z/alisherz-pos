import { ProductSelfTypeExt } from "./product-self";

const a = {
   "vendor": {
      "id": "7df5380d7da839024ba545cd3fcb025e",
      "pk": "019b18b1-f5fb-7e7c-892a-6be7cd6bcf17",
      "name": "632951e2231c5b1c4004df21ca9c37d4",
      "email": "d092be463448bfece91c34bc987b7017@gmail.com",
      "notes": "f1f9983124db85512dc515991e9983ff",
      "phone": "cfc3eeb1432bcd3eb78239766906aa83",
      "active": true,
      "address": "85392f4a030679c915f94e5cc7887f45"
   },
   "inventory": {
      "id": "cc562ed1a223f88ed662f398b501267c",
      "pk": "019b18b1-f5fb-7fea-b946-268c318a2253",
      "date": "2025-12-13T17:11:14.683354+00:00",
      "notes": "4b942328c5bb72c6b8b12ca5adf9ad23",
      "vendor": "019b18b1-f5fb-7e7c-892a-6be7cd6bcf17",
      "items": [
         {
            "item": {
               "pk": "019b18b1-f5fc-709b-90ed-357fcaaa914a",
               "cost": 0.4549281828748575,
               "notes": "f8db370f8ee9a01c9eae4cdc2ee06c5c",
               "product": "019b18b1-f5fc-7051-ab2f-a693d75830e2",
               "quantity": 1,
               "inventory": "019b18b1-f5fb-7fea-b946-268c318a2253"
            },
            "product": {
               "type": {
                  "pk": "019b1437-1027-72e7-965e-84ccea1bb95b",
                  "name": "aeb140e3641380fe9e92972be8309ea5",
                  "notes": "e9d2bfb622f2df3a9c0887724c566a59",
                  "active": true
               },
               "brand": {
                  "pk": "019b1437-1027-73cf-ac35-75943bace80b",
                  "name": "a59863b262d3f63057153c9f322bb4d5",
                  "notes": "29f07d8ea9c0ba990bff007d03462a5f",
                  "active": true
               },
               "product": {
                  "pk": "019b1437-1027-73e1-abd4-c73b520745f5",
                  "barcode": "1b610fe8cba64423171881572aa84f7a",
                  "name": "1d2c253bd7cb39d87c3ed8d5ec3ccd1c",
                  "type": "019b1437-1027-73ed-9805-784c0cd6638d",
                  "brand": "019b1437-1027-73f2-95ad-0791c96fa70e",
                  "serial": "94cf999dc488118554270abe3d5cdb2b",
                  "model": "e1c3182143b43ad906ebf022718005ab",
                  "notes": "8f349914894f68a5613d8582c3181bb8"
               },
               "history": {
                  "pk": "019b1470-085a-7dbb-a758-d20db0f2a296",
                  "amount": 0.8530909363888299,
                  "product": "019b1470-085a-7dc0-ac24-93c45647228c",
                  "notes": "b6c39afb77cbe15174ed1b496ee82fc6"
               }
            }
         }
      ]
   }
};

export interface ProductInventoryItemType {
   pk: string;
   quantity: number;
   cost: number;
   product: string;
   inventory: string;
   notes: string | null;
}

export interface ProductInventoryItemTypeExt {
   item: ProductInventoryItemType;
   product: ProductSelfTypeExt;
}