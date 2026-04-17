import { Component, computed } from '@angular/core';
import { FormField } from "@angular/forms/signals";
import { CheckBoxInput } from '../../../../elements/inputs/check-box/check-box';
import { EmailBoxInput } from '../../../../elements/inputs/email-box/email-box';
import { NoteBoxInput } from '../../../../elements/inputs/note-box/note-box';
import { TextBoxInput } from '../../../../elements/inputs/text-box/text-box';
import { CustomerType } from '../../../../types/form/party-customer';
import { FormTemplateCommons } from '../../../extensions/template-common';
import { FormInputBlackBox } from "../../black-box/black-box";
import { CustomerDropBox } from "./drop-box/drop-box";

@Component({
  selector: 'customer-form-templatez',
  imports: [TextBoxInput, FormField, EmailBoxInput, NoteBoxInput, CheckBoxInput, FormInputBlackBox, CustomerDropBox],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerFormTemplate extends FormTemplateCommons<CustomerType> {
  override fieldTree = computed(() => this.tree());
}
