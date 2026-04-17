import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { getRepairOutflowInitData, getRepairOutflowValues } from '../../../../../data/repair-outflow';
import { REPAIR_OUTFLOW_SCHEMA } from '../../../../../schemas/repair-outflow';
import { BaseFormz } from "../../../../templates/forms/form/form";
import { RepairOutFlowChildrenTemplate } from "../../../../templates/forms/repair/outflow/children/children";
import { RepairOutflowFormTemplate } from "../../../../templates/forms/repair/outflow/outflow";
import { RepairOutflowAPIType } from '../../../../types/api/repair-outflow';
import { RepairOutflowType } from '../../../../types/form/repair-outflow';
import { FormCommonProperties } from '../../../extensions/form-common';
import { HttpRepairOutflowZ } from '../outflow.http';

@Component({
  selector: 'repair-outflow-formz',
  imports: [BaseFormz, RepairOutflowFormTemplate, RepairOutFlowChildrenTemplate],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class RepairOutflowFormZ extends FormCommonProperties<RepairOutflowType> {
  override http = inject(HttpRepairOutflowZ);
  override modelz = signal<RepairOutflowType>(getRepairOutflowInitData());
  override formz = form(this.modelz, REPAIR_OUTFLOW_SCHEMA)

  override makeit(): void {
    const values = getRepairOutflowValues(this.formz);
    this.structured.set(values);
  }

  getData = effect(() => {
    const data: RepairOutflowAPIType = this.data();
    if (!data) return;

    const outflow = getRepairOutflowInitData({
      pk: data.pk,
      id: data.id,
      date: new Date(data.date),
      notes: data.notes,
      ticket: data.ticket,
      customer: data.customer,
      item: {
        saves: data.items
      },
      service: {
        saves: data.services
      }
    });

    this.formz().value.set(outflow);
  });
}

