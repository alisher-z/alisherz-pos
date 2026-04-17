import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, input, output } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { IconLink } from "../../../elements/buttons/icon-link/icon-link";
import { Icon } from "../../../elements/buttons/icon/icon";
import { NormalButton } from "../../../elements/buttons/normal-button/normal-button";

@Component({
  selector: 'local-formz',
  imports: [CdkTrapFocus, Icon, IconLink, NormalButton],
  templateUrl: './local-form.html',
  styleUrl: './local-form.scss',
})
export class LocalFormZ<T> {
  tree = input.required<FieldTree<unknown>>();
  titlez = input<string | null>(null);
  btnText = input<string>('Submit', { alias: 'btn-text' });

  submitz = output<void>();
  resetz = output<void>();


  submit(e: SubmitEvent) {
    e.preventDefault();
    this.submitz.emit();
  }

  get form() {
    return this.tree();
  }

  // e = effect(() => console.log(this.tree()().value()));
}
