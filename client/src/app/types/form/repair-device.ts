import { CommonType } from "./common";
import { CustomerType } from "./party-customer";
import { BrandType } from "./public-brand";

const a = {
   "customer": {
      "id": "4298d69dc702251163bf90d7d6b4f26d",
      "pk": "019b1d98-a87b-756d-809f-5bfb539be09a",
      "name": "9f7040cdefdd5e2d1e026b4ae3fc40c5",
      "phone": "8475e9fc36a65a345c2fdfd5bec128f5",
      "email": "1fe1d33580ba68bb588dfec760ac0f88@gmail.com",
      "notes": "cf037e9b38b297521ea39812662f957d",
      "address": "bd77b03a5f59b4beca3fc71abeda689e",
      "active": true
   },
   "brand": {
      "pk": "019b1d98-a879-7246-b26a-fe644ef73734",
      "name": "394c33af94ec472ba8394c993a99e5d0",
      "notes": "b484bb8200bf341e533689d8bf219fd6",
      "active": true
   },
   "device": {
      "pk": "019b1d98-a87b-75e5-9979-32da7736193e",
      "brand": "019b1d98-a879-7246-b26a-fe644ef73734",
      "customer": "019b1d98-a87b-756d-809f-5bfb539be09a",
      "model": "9c98ce3134971c99ece03b4339b26bd7",
      "serial": "b574c9666af9a6715f403397163096b3",
      "notes": "c57b1c4e554714191aa3816de1279371",
   }
}


export interface DeviceType extends CommonType {
   brand: string;
   customer: string;
   model: string | null;
   serial: string | null;
   notes: string | null;
}

export interface DeviceTypeExt {
   customer: CustomerType;
   brand: BrandType;
   device: DeviceType;
}