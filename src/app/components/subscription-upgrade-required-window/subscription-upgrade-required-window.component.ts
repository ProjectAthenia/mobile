import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-subscription-upgrade-required-window',
    templateUrl: './subscription-upgrade-required-window.component.html',
    styleUrls: ['./subscription-upgrade-required-window.component.scss']
})
export class SubscriptionUpgradeRequiredWindowComponent {

    /**
     * The emitter for when the user closes the window
     */
    @Output()
    cancel: EventEmitter<any> = new EventEmitter<any>();

    /**
     * The name that is used throughout the system to signify the name of subscriptions
     */
    @Input()
    subscriptionBrandName: string = 'membership';

    /**
     * The feature id that the user does not have, which we use to pass to the subscription page
     */
    @Input()
    featureId: number;

    /**
     * Default constructor
     * @param router
     */
    constructor(private router: Router)
    {}

    /**
     * Takes the user to the upgrade process
     */
    upgradePlan()
    {
        this.cancel.emit();
        this.router.navigateByUrl('/subscriptions/' + this.featureId).catch(console.error);
    }
}
