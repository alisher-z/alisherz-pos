import { Component } from '@angular/core';
import { ElExposer } from "../../extensions/element-exposer";
import { BlackBox } from "../black-box/black-box";
import { InputCommonFiels } from '../extensions/input-common';

@Component({
  selector: 'email',
  imports: [ElExposer, BlackBox],
  templateUrl: './email-box.html',
  styleUrl: './email-box.scss',
})
export class EmailBoxInput extends InputCommonFiels<HTMLInputElement> {
  list = [
    { message: 'email is invalide', kind: '1' },
    { message: 'input is not good', kind: '2' },
    { message: 'number must be there', kind: '3' }
  ]
}
