import { CustomerType } from "./party-customer";
import { ProductInflowDetailTypeExt } from "./product-inflow-details";

const a = {
   "customer": {
      "id": "f3f783e8f8021a2d4f3558e77a946ef5",
      "pk": "019b1732-5906-7118-8e86-4270c040851c",
      "name": "f021a561db2b51a59d2b3df447427a02",
      "email": "be529e1ecffee75d22a850336ebbca46@gmail.com",
      "notes": "f71121d4d3ec9fe80260ef5694a8f4f8",
      "phone": "52161b928f2a4d5ee39b45c735ea754b",
      "active": true,
      "address": "b041892fbbece41c5f341c8fc4a35fdf"
   },
   "inflow": {
      "pk": "019b1732-5906-727c-a9aa-083dfc510a82",
      "id": "9627e51449097076b29c458779beb86c",
      "date": "2025-12-13T10:12:14.212898+00:00",
      "customer": "019b1732-5906-7118-8e86-4270c040851c",
      "notes": "73d4ffe94dc6b83a3c80b960661a0c4d",
      "details": [
         {
            "detail": {
               "pk": "019b1732-5906-74e9-a87e-f3b80e255a76",
               "notes": "c00d33ba17cdded47e5185abd90aaec1",
               "amount": 0.6337705879000184,
               "inflow": "019b1732-5906-727c-a9aa-083dfc510a82",
               "outflow": "019b1732-5906-7291-b2e2-93d25e82ffcf",
               "discount": 0.1136963281796397
            },
            "outflow": {
               "outflow": {
                  "id": "779d14dd9839e35ce0674da329e060e7",
                  "pk": "019b1732-5906-7291-b2e2-93d25e82ffcf",
                  "date": "2025-12-13T10:12:14.212898+00:00",
                  "notes": "203a389a89340bcaf99b7d29afd702c8",
                  "customer": "019b1732-5906-7118-8e86-4270c040851c",
                  "item": {
                     "saves": [
                        {
                           "pk": "019bccfa-d44f-753e-a3d5-8fbeb24ea172",
                           "outflow": "019bcce2-229b-75fa-ba45-82c8f763a77d",
                           "product": "019b078e-0560-769a-abdd-593e45b06edf",
                           "price": "019b078e-0560-7304-a038-faebab99cdf0",
                           "quantity": 1,
                           "notes": null
                        }
                     ],
                     "deletes": [
                        "019bccfa-d44f-753e-a3d5-8fbeb24ea172",
                        "019bccfa-d44f-753e-a3d5-8fbeb24ea172"
                     ]
                  }
               }
            }
         }
      ]
   }
}

export interface ProductInflowType {
   pk: string;
   id: string | null;
   date: Date;
   customer: string;
   notes: string | null;
   detail: {
      saves: ProductInflowDetailTypeExt[],
      deletes: string[] | undefined
   }
}

export interface ProductInflowTypeExt {
   customer: CustomerType;
   inflow: ProductInflowType
}