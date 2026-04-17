import moment from "moment";

export function toTime(input: string) {
    const formats = [
        'k',
        'kk',
        'k:m',
        'kk:m',
        'k:mm',
        'kk:mm',
        'k:m:s',
        'kk:m:s',
        'kk:mm:s',
        'kk:mm:ss',
        'k:mm:ss',
        'k:m:ss'
    ];

    const m = moment(input, formats, true);
    return m.isValid() ? m.format('k:m:s') : '0:0:0';
}