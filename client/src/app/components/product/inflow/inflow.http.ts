import { Injectable } from "@angular/core";
import { HttpProductZ } from "../product.http";

@Injectable({ providedIn: 'root' })
export class HttpProductInflowZ extends HttpProductZ {
   override model: string = 'inflow';
}