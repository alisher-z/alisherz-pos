import { Component, computed } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { CheckBoxInput } from "../../../../elements/inputs/check-box/check-box";
import { EmailBoxInput } from "../../../../elements/inputs/email-box/email-box";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { VendorType } from '../../../../types/form/party-vendor';
import { FormTemplateCommons } from '../../../extensions/template-common';
import { FormInputBlackBox } from "../../black-box/black-box";
import { VendorDropBox } from "./drop-box/drop-box";

@Component({
  selector: 'vendor-form-templatez',
  imports: [FormInputBlackBox, TextBoxInput, EmailBoxInput, NoteBoxInput, CheckBoxInput, FormField, VendorDropBox],
  templateUrl: './vendor.html',
  styleUrl: './vendor.scss',
})
export class VendorFormTemplate extends FormTemplateCommons<VendorType> {
  override fieldTree = computed(() => this.tree());
}
