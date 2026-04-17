import { Injectable } from "@angular/core";
import { HttpProductZ } from "../product.http";

@Injectable({ providedIn: 'root' })
export class HttpProductOutlfowZ extends HttpProductZ {
   override model: string = 'outflow';
}