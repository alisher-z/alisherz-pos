import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ElExposer } from '../../extensions/element-exposer';
import { BlackBox } from "../black-box/black-box";
import { InputCommonFiels } from '../extensions/input-common';

@Component({
  selector: 'text',
  imports: [ElExposer, FormsModule, BlackBox],
  templateUrl: './text-box.html',
  styleUrl: './text-box.scss',
})
export class TextBoxInput extends InputCommonFiels<HTMLInputElement> {
  // e = effect(() => console.log(this.value()));
}
