import { Directive, model, output } from "@angular/core";
import { CalendarDate, getMonthDates, isSameDate } from "../../../utils/calendar";

@Directive({
    host: { '[style.--height]': 'height' }
})
export class CalendarDaysInit {
    value = model.required<Date | null>();
    menu = model.required<Date>();

    clickDownE = output<void>();

    dates: CalendarDate[] = [];
    height = '15rem';

    getLastDates(date: Date) {
        const dates = getMonthDates({ date, label: 'last' });
        const weekDay = dates.at(-1)!.date.getDay() + 1;

        return weekDay > 6 ? [] : dates.slice(weekDay * -1);
    }

    getNextDates(date: Date) {
        const dates = getMonthDates({ date, label: 'next' });
        const weekDay = 7 - dates.at(0)!.date.getDay();

        return weekDay > 6 ? [] : dates.slice(0, weekDay);
    }

    isToday(date: Date) {
        return isSameDate(date, new Date);
    }

    isCurrent(date: Date) {
        return isSameDate(date, this.value() ?? new Date);
    }
}