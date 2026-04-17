import { CommonType } from "./common";
import { DeviceTypeExt } from "./repair-device";

const a = {
   "device": {
      "brand": {
         "pk": "019b1dcd-4044-7c3c-8387-66b2ebc8fbdb",
         "name": "b4e9c9ff0716e9ce7e5bc071a03ac1ef",
         "notes": "9199528978d327deeba24d96cfe4b292",
         "active": true
      },
      "device": {
         "pk": "019b1dcd-4044-7d7b-99b1-6351387a5995",
         "brand": "019b1dcd-4044-7c3c-8387-66b2ebc8fbdb",
         "model": "c228b334f0a350b5da80197b02a03654",
         "notes": "0b5d8f660709682ea4058f5a85a33b37",
         "serial": "429ef63dba083680b1695a6a4d0fd73a",
         "customer": "019b1dcd-4044-7d51-a756-9c32bb12df80"
      },
      "customer": {
         "id": "7abd97044ea81472cecf3d3f4a770a8f",
         "pk": "019b1dcd-4044-7d51-a756-9c32bb12df80",
         "name": "1d067d7ffdc1ce9bc083d6a279e720b9",
         "email": "2c54c7119139e04914b5c73bd4bfedd0@gmail.com",
         "notes": "ce8b3bb37638c0bb74ed3b09f9fa317c",
         "phone": "7e2462429c1969f594ab8c6efa75c4d7",
         "active": true,
         "address": "7e4338a4bf341b2a97da5cd26b9e0d91"
      }
   },
   "ticket": {
      "id": "aa77e5c4038217d3ed6b47efd596276b",
      "pk": "019b1dcd-4044-7daa-a3e5-c40263ba867b",
      "date": "2025-12-14T16:59:09.252349+00:00",
      "device": "019b1dcd-4044-7d7b-99b1-6351387a5995",
      "problem": "467e20166b8fb6536d4e3f653b816ecf",
      "estimated": "099e09d4f29c539294db28c983d174bf"
   }
}

export interface TicketType extends CommonType {
   id: string | null;
   date: Date;
   customer: string;
   device: string;
   estimated: number;
   problem: string | null;
}

export interface TicketTypeExt {
   device: DeviceTypeExt;
   ticket: TicketType;
}