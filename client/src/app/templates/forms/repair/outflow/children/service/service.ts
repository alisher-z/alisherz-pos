import { Component, computed, input, signal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DurationBoxZ } from "../../../../../../elements/inputs/duration/duration";
import { NoteBoxInput } from "../../../../../../elements/inputs/note-box/note-box";
import { NumberBoxInput } from "../../../../../../elements/inputs/number-box/number-box";
import { RepairOutflowServiceType } from '../../../../../../types/form/repair-outflow-service';
import { FormInputBlackBox } from "../../../../black-box/black-box";
import { ServiceSelfDropBox } from "../../../../service/self/drop-box/drop-box";

@Component({
  selector: 'repair-outflow-service-templatez',
  imports: [FormInputBlackBox, ServiceSelfDropBox, NumberBoxInput, DurationBoxZ, FormField, NoteBoxInput],
  templateUrl: './service.html',
  styleUrl: './service.scss',
})
export class RepairOutflowServiceTemplate {
  tree = input.required<FieldTree<RepairOutflowServiceType>>();
  price = signal<number>(0);
  duration = signal<number>(0);
  total = computed(() => this.price() * this.duration());

  get form() {
    return this.tree();
  }

  select(service: any) {
    if (!service) {
      this.price.set(0);
      this.form.price().value.set('');
      return;
    }

    this.price.set(service.price.amount);
    this.form.price().value.set(service.price.pk);
  }

  onDuration(value: string | null) {
    this.duration.set(Number(value));
  }
}
