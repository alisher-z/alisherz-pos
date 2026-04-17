import { Injectable } from "@angular/core";
import { HttpPartyZ } from "../party.http";

@Injectable({ providedIn: 'root' })
export class HttpVendorZ extends HttpPartyZ {
   override model: string = 'vendor';
}