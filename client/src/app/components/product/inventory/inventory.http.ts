import { Injectable } from "@angular/core";
import { HttpProductZ } from "../product.http";

@Injectable({ providedIn: 'root' })
export class HttpProductInventoryZ extends HttpProductZ {
   override model: string = 'inventory';
}