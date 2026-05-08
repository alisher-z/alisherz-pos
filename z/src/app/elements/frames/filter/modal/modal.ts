import { Component, effect, ElementRef, model, viewChild } from '@angular/core';
import { IconButton } from "../../../buttons/icon-button/icon-button";
import { RegularButton } from "../../../buttons/regular-button/regular-button";
import { Icon } from "../../../icon/icon";

@Component({
  selector: 'filter-modal',
  imports: [IconButton, Icon, RegularButton],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class FilterModal {
  opened = model<boolean>(false);
  dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const opened = this.opened();
      const dialog = this.dialogRef().nativeElement;

      opened ? dialog.showModal() : dialog.close();
    });
  }

  submit(e: SubmitEvent) {
    console.log('hi');
  }

  close() {
    this.opened.set(false);
  }

  dialogEscape(e: Event) {
    e.preventDefault();
  }
}
