import DateHelpers from './date-helpers';

describe('Test the date helpers', () => {
    it('Makes sure that the get month name works properly', () => {
        let month = new Date();
        month.setMonth(0);
        expect(DateHelpers.getMonthName(month)).toBe('January');
        month.setMonth(2);
        expect(DateHelpers.getMonthName(month)).toBe('March');
        month.setMonth(10);
        expect(DateHelpers.getMonthName(month)).toBe('November');
    });

    it('Makes sure that the suffixing works properly',  () => {
        expect(DateHelpers.suffixDay(1)).toBe('1st');
        expect(DateHelpers.suffixDay(2)).toBe('2nd');
        expect(DateHelpers.suffixDay(3)).toBe('3rd');
        expect(DateHelpers.suffixDay(4)).toBe('4th');
        expect(DateHelpers.suffixDay(11)).toBe('11th');
        expect(DateHelpers.suffixDay(12)).toBe('12th');
        expect(DateHelpers.suffixDay(13)).toBe('13th');
        expect(DateHelpers.suffixDay(21)).toBe('21st');
        expect(DateHelpers.suffixDay(22)).toBe('22nd');
    });
});
