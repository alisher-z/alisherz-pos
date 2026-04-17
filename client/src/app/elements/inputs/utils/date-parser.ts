import moment from 'moment';

export function toDate(input: string) {
    const formats = [
        'DD-MM-YYYY',
        'DD/MM/YYYY',
        'YYYY-MM-DD',
        'YYYY/MM/DD',

        'D-MM-YYYY',
        'D/MM/YYYY',
        'YYYY-MM-D',
        'YYYY/MM/D',

        'D-M-YYYY',
        'D/M/YYYY',
        'YYYY-M-D',
        'YYYY/M/D',

        'DD-M-YYYY',
        'DD/M/YYYY',
        'YYYY-M-DD',
        'YYYY/M/DD',

        'DD-MM-YY',
        'DD/MM/YY',
        'YY-MM-DD',
        'YY/MM/DD',

        'D-M-YY',
        'D/M/YY',
        'YY-M-D',
        'YY/M/D'
    ];
    const m = moment(input, formats, true);
    return m.isValid() ? m.toDate() : null;
}