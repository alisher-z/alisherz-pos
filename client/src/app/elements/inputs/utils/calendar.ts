export type Label = 'last' | 'current' | 'next';
export type CalendarDate = {
    label: Label,
    date: Date
};

export function getYears() {
    const years: number[] = [];
    for (let year = 1925; year <= 2100; year++)
        years.push(year);

    return years;
}

export function getMonths() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
}

export function getWeek() {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

function createDate({ date, label }: CalendarDate) {
    if (label === 'last')
        return new Date(date.getFullYear(), date.getMonth() - 1, 1)

    if (label === 'current')
        return new Date(date.getFullYear(), date.getMonth(), 1)

    if (label === 'next')
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);

    return null;
}

export function getMonthDates(args: CalendarDate) {
    const date = createDate(args);
    if (!date)
        return [];

    const month = date.getMonth();
    const dates: CalendarDate[] = [];

    while (date.getMonth() === month) {
        dates.push({
            label: args.label,
            date: new Date(date)
        });
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

export function isSameDate(date1: Date | null, date2: Date | null) {
    if (!date1 || !date2)
        return false;

    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

