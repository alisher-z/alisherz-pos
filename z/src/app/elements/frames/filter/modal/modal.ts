import { Component } from '@angular/core';

@Component({
  selector: 'filter-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class FilterModal {
  submit(e: SubmitEvent) {
    console.log('hi');
  }
}
