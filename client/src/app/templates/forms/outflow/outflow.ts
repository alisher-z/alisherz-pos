import { Component, inject } from '@angular/core';
import { HttpCustomerZ } from '../../../components/parties/customer/customer.http';
import { DateBoxInput } from "../../../elements/inputs/date-box/date-box";
import { NoteBoxInput } from "../../../elements/inputs/note-box/note-box";
import { SelectBox } from "../../../elements/inputs/select-box/select-box";
import { TextBoxInput } from "../../../elements/inputs/text-box/text-box";

@Component({
  selector: 'outflow-form-templatez',
  imports: [TextBoxInput, DateBoxInput, NoteBoxInput, SelectBox],
  templateUrl: './outflow.html',
  styleUrl: './outflow.scss',
})
export class OutflowFormTemplatez {
  http = inject(HttpCustomerZ);

  items: any[] = [];

  onSelect({ item }: any) {
    this.items.push({
      pk: item.pk,
      name: item.name,
      quantity: 1,
      price: 1000
    });
  }
}
