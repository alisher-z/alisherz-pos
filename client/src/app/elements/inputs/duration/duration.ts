import { Component, effect, inject } from '@angular/core';
import { ElExposer } from "../../extensions/element-exposer";
import { BlackBox } from "../black-box/black-box";
import { InputCommonFiels } from '../extensions/input-common';
import { HttpServiceDurationZ } from './duration.http';

@Component({
  selector: 'durationz',
  templateUrl: './duration.html',
  styleUrl: './duration.scss',
  imports: [BlackBox, ElExposer],
  providers: [HttpServiceDurationZ]
})
export class DurationBoxZ extends InputCommonFiels<HTMLInputElement> {
  service = inject(HttpServiceDurationZ);

  setLive = effect(() => {
    const duration = this.service.duration();
    if (!duration) return;

    this.live.emit(String(duration.hours));
  })

  onValue = effect(() => {
    const value = this.value();
    if (!value) return;

    const text = value.replace(/^\d{1,2}$/, "$&:");
    this.service.argument.set(text);
  })

  override input({ value }: HTMLInputElement): void {
    this.value.set(value);
  }

  override blur(): void {
    this.#setDuration();
  }

  enter() {
    this.#setDuration();
  }

  focus(target: HTMLInputElement) {
    target.select();
  }

  #setDuration() {
    const duration = this.service.duration();
    this.value.set(duration?.duration ?? null);
    this.left.emit(duration?.duration ?? null);
    this.service.argument.set(null);
  }
}
