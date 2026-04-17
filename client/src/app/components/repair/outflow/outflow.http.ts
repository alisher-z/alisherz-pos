import { Injectable } from "@angular/core";
import { HttpRepairZ } from "../repair.http";

@Injectable({ providedIn: 'root' })
export class HttpRepairOutflowZ extends HttpRepairZ {
   override model: string = 'outflow';
}