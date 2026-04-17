import { Component, input } from '@angular/core';
import { Field, FieldTree, FormField } from '@angular/forms/signals';
import { NumberBoxInput } from "../../../../elements/inputs/number-box/number-box";
import { ServicePriceHistoryTypeExt } from '../../../../types/form/service-price-history';
import { FormInputBlackBox } from "../../black-box/black-box";
import { ServiceSelfTemplate } from "../self/self";

@Component({
  selector: 'service-price-history-form-templatez',
  imports: [FormInputBlackBox, ServiceSelfTemplate, NumberBoxInput, FormField],
  templateUrl: './price-history.html',
  styleUrl: './price-history.scss',
})
export class ServicePriceHistoryFormTemplate {
  tree = input.required<FieldTree<ServicePriceHistoryTypeExt>>();

  get form() {
    return this.tree();
  }
}
