import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DateBoxInput } from "../../../../elements/inputs/date-box/date-box";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { TextBoxInput } from "../../../../elements/inputs/text-box/text-box";
import { RepairOutflowType } from '../../../../types/form/repair-outflow';
import { FormInputBlackBox } from "../../black-box/black-box";
import { CustomerDropBox } from "../../parties/customer/drop-box/drop-box";
import { TicketDropBox } from "../ticket/drop-box/drop-box";

@Component({
  selector: 'repair-outflow-form-templatez',
  imports: [FormInputBlackBox, TextBoxInput, FormField, DateBoxInput, NoteBoxInput, CustomerDropBox, TicketDropBox],
  templateUrl: './outflow.html',
  styleUrl: './outflow.scss',
})
export class RepairOutflowFormTemplate {
  tree = input.required<FieldTree<RepairOutflowType>>();

  get form() {
    return this.tree();
  }
}
