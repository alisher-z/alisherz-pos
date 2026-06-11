import { Component, effect, inject, input, output } from '@angular/core';
import { HttpBaseZ } from '../../../components/http-base';
import { SelectBoxInput } from "./input/input";
import { SelectBoxBridge } from './select-box.bridge';
import { SelectBoxView } from "./view/view";

@Component({
  selector: 'selectz',
  templateUrl: './select-box.html',
  styleUrl: './select-box.scss',
  imports: [SelectBoxView, SelectBoxInput],
  providers: [SelectBoxBridge]
})
export class SelectBox {
  http = input.required<HttpBaseZ>();
  selected = output<{ event: PointerEvent, item: any, pk: string }>();

  bridge = inject(SelectBoxBridge);

  constructor() {
    this.bridge.http = this.http;
    this.bridge.selected = this.selected;

    effect(() => {
      const http = this.http();
      http.asSinglePage();
      this.bridge.http_ = http;
    });
  }
}
