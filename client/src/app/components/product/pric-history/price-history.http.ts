import { Injectable } from "@angular/core";
import { HttpProductZ } from "../product.http";

@Injectable({ providedIn: 'root' })
export class HttpProductPriceHistoryZ extends HttpProductZ {
   override model: string = 'price-history';
}