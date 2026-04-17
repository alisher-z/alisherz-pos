import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { ElExposer } from "../../extensions/element-exposer";
import { BlackBox } from "../black-box/black-box";
import { InputCommonFiels } from '../extensions/input-common';

@Component({
  selector: 'note',
  imports: [TextFieldModule, ElExposer, BlackBox],
  templateUrl: './note-box.html',
  styleUrl: './note-box.scss',
})
export class NoteBoxInput extends InputCommonFiels<HTMLTextAreaElement> {
}
