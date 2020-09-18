import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-overlay-window',
    templateUrl: './overlay-window.component.html',
    styleUrls: ['./overlay-window.component.scss']
})
export class OverlayWindowComponent {

    /**
     * The emitter for when the user closes the window
     */
    @Output()
    close: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Whether or not this overlay should fill nearly the full area
     */
    @Input()
    full = false;
}
