import { Injectable } from "@angular/core";
import { HttpServiceZ } from "../service.http";

@Injectable({ providedIn: 'root' })
export class HttpServicePriceHistory extends HttpServiceZ {
   override model: string = 'price-history';
}