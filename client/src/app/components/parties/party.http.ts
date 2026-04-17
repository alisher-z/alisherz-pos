import { Injectable } from "@angular/core";
import { HttpBaseZ } from "../http-base";

@Injectable({ providedIn: 'root' })
export abstract class HttpPartyZ extends HttpBaseZ {
    override namespace: string = 'party';
}