/**
 * Some needed helpers throughout the app
 */
export default class DateHelpers {

    /**
     * Takes a numerical day and adds the proper suffix
     * @param day
     */
    static suffixDay(day) {
        const j = day % 10,
            k = day % 100;
        if (j == 1 && k != 11) {
            return day + "st";
        }
        if (j == 2 && k != 12) {
            return day + "nd";
        }
        if (j == 3 && k != 13) {
            return day + "rd";
        }
        return day + "th";
    }
}