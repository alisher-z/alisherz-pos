import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { CheckButton } from '../../../elements/buttons/check-button/check-button';
import { CommonType } from '../../../types/form/common';

@Component({
  selector: 'form-input-blackbox',
  imports: [CheckButton, FormField],
  templateUrl: './black-box.html',
  styleUrl: './black-box.scss',
})
export class FormInputBlackBox {
  tree = input.required<FieldTree<unknown>>();
  btn = input.required<boolean>();

  get form() {
    return <any>this.tree() as FieldTree<CommonType>;
  }

}
