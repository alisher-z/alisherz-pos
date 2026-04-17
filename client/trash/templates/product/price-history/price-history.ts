import { Component } from '@angular/core';
import { Field } from "@angular/forms/signals";
import { NoteBoxInput } from "../../../../elements/inputs/note-box/note-box";
import { NumberBoxInput } from "../../../../elements/inputs/number-box/number-box";
import { FormTemplateCommonProperties } from '../../extensions/form-template-common';
import { iProductPriceHistory } from './price-history.type';

@Component({
  selector: 'product-price-history-form-template',
  imports: [NumberBoxInput, Field, NoteBoxInput],
  templateUrl: './price-history.html',
  styleUrl: './price-history.scss',
})
export class ProductPriceHistoryFormTemplate extends FormTemplateCommonProperties<iProductPriceHistory> {

}
