import { Injectable } from "@angular/core";
import { HttpRepairZ } from "../repair.http";

@Injectable({ providedIn: 'root' })
export class HttpTicketZ extends HttpRepairZ {
   override model: string = 'ticket';
}