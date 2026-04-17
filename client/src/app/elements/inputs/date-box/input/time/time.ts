import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { waitForMe } from '../../../../../utils/wait-for-me';
import { IconButton } from '../../../../buttons/icon-button/icon-button';
import { DateTimeService } from './time.service';

@Component({
  selector: 'date-time',
  templateUrl: './time.html',
  styleUrl: './time.scss',
  imports: [IconButton, DatePipe],
  providers: [DateTimeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTime {
  service = inject(DateTimeService);
  textRef = viewChild.required<ElementRef<HTMLInputElement>>('text');
  formatedRef = viewChild.required<ElementRef<HTMLInputElement>>('formated');
  focused = false;
  oldTime: string = '';

  async focus() {
    this.focused = true;
    await waitForMe();
    this.textInput.select();
    this.oldTime = this.textInput.value;
  }

  keydown(e: KeyboardEvent) {
    this.service.sanitize(e);
  }

  blur() {
    this.focused = false;
    const value = this.textInput.value;
    const time = this.service.getTime(value);
    this.service.setTime(time);
  }

  escape() {
    const time = this.service.getTime(this.oldTime);
    this.service.setTime(time);
    this.textInput.value = this.oldTime;
    this.textInput.select();
  }

  mousedown(e: MouseEvent) {
    e.preventDefault();

    const date = new Date;
    const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const time = this.service.getTime(timeStr);
    this.service.setTime(time);

    try {
      this.textInput.select();
    } catch {
      this.formated.select();
    }
  }

  get textInput() {
    return this.textRef().nativeElement;
  }

  get formated() {
    return this.formatedRef().nativeElement;
  }

  get value() {
    return this.service.service.value();
  }

  // e = effect(() => console.log(this.service.service.value()));
}
