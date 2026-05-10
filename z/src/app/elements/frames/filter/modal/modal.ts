import { Component, effect, ElementRef, model, output, untracked, viewChild } from '@angular/core';
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
  form = model.required<any>();

  done = output<any>();
  dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  formCloned!: any;


  constructor() {
    effect(() => {
      const opened = this.opened();

      this.openOrClose(opened);
      this.setFormCloned(opened);
    });
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    this.opened.set(false);
    this.done.emit(structuredClone(this.form()));
    this.formCloned = null;
  }

  close() {
    this.opened.set(false);
    this.form.set(this.formCloned);
    this.formCloned = null;
  }

  dialogEscape(e: Event) {
    e.preventDefault();
  }

  private openOrClose(v: boolean) {
    const dialog = untracked(this.dialogRef).nativeElement;
    v ? dialog.showModal() : dialog.close();
  }

  private setFormCloned(v: boolean) {
    setTimeout(() =>
      this.formCloned = v ? structuredClone(untracked(this.form)) : null
    );
  }
}
