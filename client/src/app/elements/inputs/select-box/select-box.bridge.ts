import { Injectable, InputSignal, OutputEmitterRef } from "@angular/core";
import { HttpBaseZ } from "../../../components/http-base";

@Injectable()
export class SelectBoxBridge {
    http!: InputSignal<HttpBaseZ>;
    http_!: HttpBaseZ;

    selected!: OutputEmitterRef<{ event: PointerEvent, item: any, pk: string }>;
}