import { Component, inject, output } from '@angular/core';
import { Field, FormField } from "@angular/forms/signals";
import { HttpServiceSelfZ } from '../../../../../components/service/self/self.http';
import { DropBoxInput } from "../../../../../elements/inputs/drop-box/drop-box";
import { FormDropBoxCommons } from '../../../../extensions/dropbox-common';

@Component({
  selector: 'service-self-dropbox',
  imports: [DropBoxInput, FormField],
  templateUrl: './drop-box.html',
  styleUrl: './drop-box.scss',
})
export class ServiceSelfDropBox extends FormDropBoxCommons {
  override http = inject(HttpServiceSelfZ);
  selection = output<any>();
}
