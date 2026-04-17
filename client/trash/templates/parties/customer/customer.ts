import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { CheckBoxInput } from '../../../../elements/inputs/check-box/check-box';
import { EmailBoxInput } from '../../../../elements/inputs/email-box/email-box';
import { NoteBoxInput } from '../../../../elements/inputs/note-box/note-box';
import { TextBoxInput } from '../../../../elements/inputs/text-box/text-box';
import { iCustomer } from './customer.type';

@Component({
  selector: 'customer-form-template',
  imports: [TextBoxInput, Field, NoteBoxInput, CheckBoxInput, EmailBoxInput],
  templateUrl: './customer.html',
  styleUrl: './customer.scss'
})
export class CustomerFormTemplate {
  readonly tree = input.required<FieldTree<iCustomer, string | number>>();

  get model() {
    return this.tree();
  }
}
