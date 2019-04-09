import { Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'rating-bar',
    templateUrl: 'rating-bar.component.html'
})
export class RatingBarComponent {

    /**
     * The current rating
     */
    @Input() rating: number ;

    /**
     * The rating change callback
     */
    @Output() ratingChange: EventEmitter<number> = new EventEmitter();

    /**
     * Updates the rating properly
     * @param index
     */
    rate(index: number) {
        this.rating = index;
        this.ratingChange.emit(this.rating);
    }

    /**
     * Gets the color for the element
     * @param index
     */
    getColor(index: number) {
        if (this.isAboveRating(index)) {
            return 'var(--ion-color-medium)';
        }

        switch (this.rating) {
            case 1:
            case 2:
                return 'var(--ion-color-danger)';
            case 3:
                return 'var(--ion-color-warning)';
            case 4:
            case 5:
                return 'var(--ion-color-success)';
            default:
                return 'var(--ion-color-medium)';
        }
    }

    /**
     * Lets us know whether or not the passed in index is above the current rating
     * @param index
     */
    isAboveRating(index: number): boolean {
        return index > this.rating;
    }
}
