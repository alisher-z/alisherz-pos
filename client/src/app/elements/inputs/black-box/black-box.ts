import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { Component, input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ValidationError, WithOptionalField } from "@angular/forms/signals";
import { InputError } from "../error/error";

@Component({
  selector: 'black-box',
  imports: [FormsModule, InputError, CdkOverlayOrigin],
  templateUrl: './black-box.html',
  styleUrl: './black-box.scss'
})
export class BlackBox {
  label = input<string | null>(null);
  required = input<boolean>(false);
  touched = input.required<boolean>();
  errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  id = input.required<string>();
}
