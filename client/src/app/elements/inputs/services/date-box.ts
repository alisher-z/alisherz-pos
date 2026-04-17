import { Injectable, signal } from "@angular/core";

@Injectable()
export class DateBoxInputService {
    currentDate = signal<Date | null>(null);
}