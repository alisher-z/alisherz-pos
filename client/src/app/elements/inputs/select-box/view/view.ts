import { Component, effect, inject } from '@angular/core';
import { SelectBoxBridge } from '../select-box.bridge';

@Component({
  selector: 'select-box-view',
  imports: [],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class SelectBoxView {
  bridge = inject(SelectBoxBridge);

  e = effect(() => console.log(this.bridge.http().chunks()));

  select(event: PointerEvent, item: any) {
    this.bridge.selected.emit({ event, item, pk: item?.pk });
  }

  childClick(e: PointerEvent) {
    e.stopPropagation();
    console.log('child');
  }
}
