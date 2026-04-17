import { Injectable } from "@angular/core";
import { HttpBaseZ } from "../http-base";

@Injectable({ providedIn: 'root' })
export abstract class HttpPublicZ extends HttpBaseZ {
    override namespace: string = 'public';
}