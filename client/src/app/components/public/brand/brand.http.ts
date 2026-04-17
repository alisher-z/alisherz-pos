import { Injectable } from "@angular/core";
import { HttpPublicZ } from "../public.http";

@Injectable({ providedIn: 'root' })
export class HttpBrandZ extends HttpPublicZ {
    override model: string = 'brand';
}