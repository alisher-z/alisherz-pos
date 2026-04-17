import { Component, computed, effect, input } from '@angular/core';
import { Field, FormField } from "@angular/forms/signals";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { ServiceSelfTypeExt } from '../../../../types/form/service-self';
import { FormTemplateCommons } from '../../../extensions/template-common';
import { FormInputBlackBox } from "../../black-box/black-box";
import { ServiceSelfDropBox } from "./drop-box/drop-box";

@Component({
  selector: 'service-self-templatez',
  imports: [FormInputBlackBox, TextBoxInput, FormField, NoteBoxInput, ServiceSelfDropBox],
  templateUrl: './self.html',
  styleUrl: './self.scss',
})
export class ServiceSelfTemplate extends FormTemplateCommons<ServiceSelfTypeExt> {
  override fieldTree = computed(() => this.tree().service);
  embedded = input<boolean>(false);

  setPriceHistory = effect(() => {
    const servicePK = this.form.service.pk().value();
    const embedded = this.embedded();

    if (!embedded)
      this.form.history.service().value.set(servicePK);
  });
}
